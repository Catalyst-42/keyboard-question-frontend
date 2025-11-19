import { apiClient } from './api';
import { Keyboard } from '@/api';

export const keyboardService = {
  getKeyboards: async (): Promise<Keyboard[]> => {
    const response = await apiClient.get<Keyboard[]>('/keyboards/');
    return response.data;
  },

  getKeyboard: async (id: number): Promise<Keyboard> => {
    const response = await apiClient.get<Keyboard>(`/keyboards/${id}/`);
    return response.data;
  },
};