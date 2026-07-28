/**
 * WebSocket Manager for real-time incident updates
 * Handles subscriptions, reconnections, and event distribution
 */

export type WSEventType =
  | 'INCIDENT_CREATED'
  | 'INCIDENT_UPDATED'
  | 'INCIDENT_CLOSED'
  | 'UNIT_DISPATCHED'
  | 'UNIT_LOCATION_UPDATED'
  | 'UNIT_STATUS_CHANGED'
  | 'DISPATCH_CREATED'
  | 'DISPATCH_COMPLETED'
  | 'SHELTER_UPDATED'
  | 'RESOURCE_UPDATED'
  | 'CONNECTION_STATUS';

export interface WSMessage {
  type: WSEventType;
  payload: Record<string, any>;
  timestamp: number;
  id: string;
}

type EventHandler = (payload: Record<string, any>) => void;

class WebSocketManager {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private messageId = 0;
  private subscribers: Map<WSEventType, Set<EventHandler>> = new Map();
  private isConnectedFlag = false;
  private connectionListeners: Set<(status: boolean) => void> = new Set();

  constructor(url?: string) {
    this.url = url || (typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_WS_URL : '') || 'ws://localhost:3001';
  }

  /**
   * Connect to WebSocket server
   */
  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
          console.log('[WS] Connected to server');
          this.isConnectedFlag = true;
          this.reconnectAttempts = 0;
          this.reconnectDelay = 1000;
          this.notifyConnectionListeners(true);
          resolve();
        };

        this.ws.onmessage = (event: MessageEvent) => {
          this.handleMessage(event.data);
        };

        this.ws.onerror = (error: Event) => {
          console.error('[WS] Connection error:', error);
          this.isConnectedFlag = false;
          this.notifyConnectionListeners(false);
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('[WS] Connection closed');
          this.isConnectedFlag = false;
          this.notifyConnectionListeners(false);
          this.attemptReconnect();
        };
      } catch (error) {
        console.error('[WS] Failed to create WebSocket:', error);
        this.attemptReconnect();
        reject(error);
      }
    });
  }

  /**
   * Disconnect from WebSocket server
   */
  public disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnectedFlag = false;
    this.notifyConnectionListeners(false);
  }

  /**
   * Subscribe to event type
   */
  public subscribe(eventType: WSEventType, handler: EventHandler): () => void {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, new Set());
    }

    this.subscribers.get(eventType)!.add(handler);

    // Return unsubscribe function
    return () => {
      const handlers = this.subscribers.get(eventType);
      if (handlers) {
        handlers.delete(handler);
      }
    };
  }

  /**
   * Emit event to server
   */
  public emit(eventType: WSEventType, payload: Record<string, any>): void {
    if (!this.isConnectedFlag || !this.ws) {
      console.warn('[WS] Not connected, cannot emit:', eventType);
      return;
    }

    const message: WSMessage = {
      type: eventType,
      payload,
      timestamp: Date.now(),
      id: String(++this.messageId),
    };

    try {
      this.ws.send(JSON.stringify(message));
    } catch (error) {
      console.error('[WS] Failed to send message:', error);
    }
  }

  /**
   * Check if connected
   */
  public isConnected(): boolean {
    return this.isConnectedFlag && this.ws?.readyState === WebSocket.OPEN;
  }

  /**
   * Alias for isConnected (used in hooks)
   */
  public isConnectedStatus(): boolean {
    return this.isConnected();
  }

  /**
   * Listen to connection status changes
   */
  public onConnectionStatusChange(callback: (status: boolean) => void): () => void {
    this.connectionListeners.add(callback);
    return () => this.connectionListeners.delete(callback);
  }

  /**
   * Handle incoming messages
   */
  private handleMessage(data: string): void {
    try {
      const message: WSMessage = JSON.parse(data);
      const handlers = this.subscribers.get(message.type);

      if (handlers) {
        handlers.forEach((handler) => {
          try {
            handler(message.payload);
          } catch (error) {
            console.error('[WS] Error in handler:', error);
          }
        });
      }
    } catch (error) {
      console.error('[WS] Failed to parse message:', error);
    }
  }

  /**
   * Attempt to reconnect
   */
  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('[WS] Max reconnect attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(`[WS] Attempting reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);

    setTimeout(() => {
      this.connect().catch((error) => {
        console.error('[WS] Reconnect failed:', error);
      });
    }, delay);
  }

  /**
   * Notify connection listeners
   */
  private notifyConnectionListeners(status: boolean): void {
    this.connectionListeners.forEach((callback) => {
      try {
        callback(status);
      } catch (error) {
        console.error('[WS] Error in connection listener:', error);
      }
    });
  }
}

// Export singleton instance
export const wsManager = new WebSocketManager();
