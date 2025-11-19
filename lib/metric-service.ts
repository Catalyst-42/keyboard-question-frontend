import { apiClient } from './api';
import { Metric, MetricWithRelations } from '@/api';

export const metricService = {
  getMetrics: async (): Promise<MetricWithRelations[]> => {
    const response = await apiClient.get<MetricWithRelations[]>('/metrics/');
    return response.data;
  },

  getMetric: async (id: number): Promise<MetricWithRelations> => {
    const response = await apiClient.get<MetricWithRelations>(`/metrics/${id}/`);
    return response.data;
  },
};