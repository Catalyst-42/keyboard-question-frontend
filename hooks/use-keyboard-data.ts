'use client';

import { useState, useEffect } from 'react';
import { Keyboard } from '@/api';
import { keyboardService } from '@/lib/keyboard-service';

export function useKeyboardData() {
  const [data, setData] = useState<Keyboard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await keyboardService.getKeyboards();
        setData(result);
      } catch (err) {
        setError('Ошибка при загрузке данных клавиатур');
        console.error('Error fetching keyboards:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}