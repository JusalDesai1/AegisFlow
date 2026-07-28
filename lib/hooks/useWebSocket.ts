import { useEffect, useState } from 'react';
import { wsManager, WSEventType } from '@/lib/ws/wsManager';

/**
 * Hook for subscribing to WebSocket events
 * @param eventType - The type of event to listen for
 * @param handler - Callback function when event is received
 */
export function useWebSocket(eventType: WSEventType, handler: (payload: any) => void) {
  useEffect(() => {
    const unsubscribe = wsManager.subscribe(eventType, handler);
    return unsubscribe;
  }, [eventType, handler]);
}

/**
 * Hook for monitoring WebSocket connection status
 * @returns boolean indicating if WebSocket is connected
 */
export function useWebSocketStatus() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check initial status
    setIsConnected(wsManager.isConnectedStatus());

    // Set up interval to check status
    const checkStatus = setInterval(() => {
      setIsConnected(wsManager.isConnectedStatus());
    }, 1000);

    return () => clearInterval(checkStatus);
  }, []);

  return isConnected;
}
