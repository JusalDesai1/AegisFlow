import { useEffect } from 'react';
import { wsManager, WSEventType } from '@/lib/ws/wsManager';

export function useWebSocket(eventType: WSEventType, handler: (payload: any) => void) {
  useEffect(() => {
    const unsubscribe = wsManager.subscribe(eventType, handler);
    return unsubscribe;
  }, [eventType, handler]);
}

export function useWebSocketStatus() {
  const [isConnected, setIsConnected] = React.useState(false);

  useEffect(() => {
    const checkStatus = setInterval(() => {
      setIsConnected(wsManager.isConnected());
    }, 1000);

    return () => clearInterval(checkStatus);
  }, []);

  return isConnected;
}
