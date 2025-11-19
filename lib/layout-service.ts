import { apiClient } from './api';
import { Layout, LayoutPreview } from '@/api';

export const layoutService = {
  getLayouts: async (): Promise<Layout[]> => {
    const response = await apiClient.get<Layout[]>('/layouts/');
    return response.data;
  },

  getLayout: async (id: number): Promise<Layout> => {
    const response = await apiClient.get<Layout>(`/layouts/${id}/`);
    return response.data;
  },

  getLayoutPreviews: async (): Promise<LayoutPreview[]> => {
    const response = await apiClient.get<LayoutPreview[]>('/layout-previews/');
    return response.data;
  },
};
