import { apiClient } from './api';
import { Corpus } from '@/api';

export const corpusService = {
  getCorpora: async (): Promise<Corpus[]> => {
    const response = await apiClient.get<Corpus[]>('/corpora/');
    return response.data;
  },
};