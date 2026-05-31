import axios, { AxiosInstance, AxiosError } from 'axios';
import { Incident, Alert, Unit, Dispatch, Shelter } from '@/types';

class APIClient {
  private client: AxiosInstance;
  private baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

  constructor() {
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add auth token to requests
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        console.error('API Error:', error.message);
        return Promise.reject(error);
      }
    );
  }

  // Incidents
  async getIncidents(): Promise<Incident[]> {
    const { data } = await this.client.get('/incidents');
    return data;
  }

  async getIncident(id: string): Promise<Incident> {
    const { data } = await this.client.get(`/incidents/${id}`);
    return data;
  }

  async createIncident(incident: Omit<Incident, 'id' | 'createdAt' | 'updatedAt'>): Promise<Incident> {
    const { data } = await this.client.post('/incidents', incident);
    return data;
  }

  async updateIncident(id: string, updates: Partial<Incident>): Promise<Incident> {
    const { data } = await this.client.patch(`/incidents/${id}`, updates);
    return data;
  }

  // Alerts
  async getAlerts(): Promise<Alert[]> {
    const { data } = await this.client.get('/alerts');
    return data;
  }

  async createAlert(alert: Omit<Alert, 'id' | 'createdAt'>): Promise<Alert> {
    const { data } = await this.client.post('/alerts', alert);
    return data;
  }

  async acknowledgeAlert(alertId: string): Promise<Alert> {
    const { data } = await this.client.patch(`/alerts/${alertId}/acknowledge`);
    return data;
  }

  // Units
  async getUnits(): Promise<Unit[]> {
    const { data } = await this.client.get('/units');
    return data;
  }

  async updateUnit(id: string, updates: Partial<Unit>): Promise<Unit> {
    const { data } = await this.client.patch(`/units/${id}`, updates);
    return data;
  }

  // Dispatches
  async createDispatch(dispatch: Omit<Dispatch, 'id' | 'createdAt'>): Promise<Dispatch> {
    const { data } = await this.client.post('/dispatches', dispatch);
    return data;
  }

  async updateDispatchStatus(id: string, status: string): Promise<Dispatch> {
    const { data } = await this.client.patch(`/dispatches/${id}`, { status });
    return data;
  }

  // Shelters
  async getShelters(): Promise<Shelter[]> {
    const { data } = await this.client.get('/shelters');
    return data;
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.client.get('/health');
      return true;
    } catch {
      return false;
    }
  }
}

export const apiClient = new APIClient();
