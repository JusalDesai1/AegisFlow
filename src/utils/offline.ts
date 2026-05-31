import { QueuedAction } from '@/types';

const CACHE_KEY = 'aegisflow_offline_cache';
const QUEUE_KEY = 'aegisflow_action_queue';

export class OfflineManager {
  static saveCache(key: string, data: any): void {
    try {
      const cache = this.getCache();
      cache[key] = {
        data,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (error) {
      console.error('Failed to save cache:', error);
    }
  }

  static getCache(): Record<string, any> {
    try {
      const cache = localStorage.getItem(CACHE_KEY);
      return cache ? JSON.parse(cache) : {};
    } catch {
      return {};
    }
  }

  static getCacheItem(key: string): any {
    const cache = this.getCache();
    return cache[key]?.data;
  }

  static isCacheStale(key: string, maxAgeMs: number = 3600000): boolean {
    const cache = this.getCache();
    if (!cache[key]) return true;
    const age = Date.now() - new Date(cache[key].timestamp).getTime();
    return age > maxAgeMs;
  }

  static clearCache(): void {
    localStorage.removeItem(CACHE_KEY);
  }

  static queueAction(action: Omit<QueuedAction, 'id' | 'createdAt' | 'status' | 'retryCount'>): void {
    try {
      const queue = this.getQueue();
      const newAction: QueuedAction = {
        id: `action_${Date.now()}`,
        type: action.type,
        payload: action.payload,
        createdAt: new Date(),
        status: 'PENDING',
        retryCount: 0,
      };
      queue.push(newAction);
      localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    } catch (error) {
      console.error('Failed to queue action:', error);
    }
  }

  static getQueue(): QueuedAction[] {
    try {
      const queue = localStorage.getItem(QUEUE_KEY);
      return queue ? JSON.parse(queue) : [];
    } catch {
      return [];
    }
  }

  static removeFromQueue(actionId: string): void {
    const queue = this.getQueue();
    const filtered = queue.filter((a) => a.id !== actionId);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(filtered));
  }

  static clearQueue(): void {
    localStorage.removeItem(QUEUE_KEY);
  }
}
