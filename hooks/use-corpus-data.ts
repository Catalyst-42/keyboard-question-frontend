'use client';

import { useState, useEffect } from 'react';
import { Corpus } from '@/api';
import { corpusService } from '@/lib/corpus-service';

export function useCorpusData() {
  const [data, setData] = useState<Corpus[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await corpusService.getCorpora();
        setData(result);
      } catch (err) {
        setError('Ошибка при загрузке данных корпусов');
        console.error('Error fetching corpora:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}