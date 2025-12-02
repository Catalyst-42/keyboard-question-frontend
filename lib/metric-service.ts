import { apiClient } from './api';
import { Metric, MetricExtremes, MetricWithRelations } from '@/api';

export const metricService = {
  getMetrics: async (): Promise<MetricWithRelations[]> => {
    const response = await apiClient.get<MetricWithRelations[]>('/metrics/');
    return response.data;
  },

  getMetric: async (id: number): Promise<MetricWithRelations> => {
    const response = await apiClient.get<MetricWithRelations>(`/metrics/${id}/`);
    return response.data;
  },

  // Fetch multiple metrics by comma-separated ids query param, e.g. /metrics/?ids=1,8
  getMetricsByIds: async (ids: number[]): Promise<MetricWithRelations[]> => {
    const q = ids.join(',');
    const response = await apiClient.get<MetricWithRelations[]>('/metrics/', { params: { ids: q } });
    return response.data;
  },

  getMetricsExtremes: async (): Promise<MetricExtremes> => {
    const response = await apiClient.get(`/metrics/extremes/`);
    return response.data;
  },
};
