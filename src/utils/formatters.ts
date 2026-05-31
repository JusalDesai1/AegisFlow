import { formatDistanceToNow, format } from 'date-fns';
import { SeverityLevel } from '@/types';

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'MMM dd, yyyy HH:mm');
}

export function formatTimeAgo(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function formatCoordinates(lat: number, lon: number): string {
  return `${lat.toFixed(4)}° N | ${lon.toFixed(4)}° E`;
}

export function getSeverityColor(severity: SeverityLevel): string {
  const colors: Record<SeverityLevel, string> = {
    CRITICAL: '#ff3333',
    HIGH: '#ff6b4a',
    MODERATE: '#ffa500',
    LOW: '#00b8e6',
    INFO: '#a0aec0',
  };
  return colors[severity];
}

export function getSeverityLabel(severity: SeverityLevel): string {
  const labels: Record<SeverityLevel, string> = {
    CRITICAL: 'CRITICAL',
    HIGH: 'HIGH',
    MODERATE: 'MODERATE',
    LOW: 'LOW',
    INFO: 'INFO',
  };
  return labels[severity];
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(num);
}

export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}
