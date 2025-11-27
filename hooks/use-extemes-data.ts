'use client';

import { useState, useEffect } from 'react';
import { MetricExtremes } from '@/api';
import { metricService } from '@/lib/metric-service';

export function useExtremesData() {
  const [data, setData] = useState<MetricExtremes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await metricService.getMetricsExtremes();
        setData(result);
      } catch (err) {
        setError('Ошибка при загрузке экстремальных значений метрик');
        console.error('Error fetching metrics extremes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}