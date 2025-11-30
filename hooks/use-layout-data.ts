'use client';

import { useState, useEffect } from 'react';
import { Layout, LayoutPreview } from '@/api';
import { layoutService } from '@/lib/layout-service';

export function useLayoutData() {
  const [data, setData] = useState<Layout[] | null>(null);
  const [previews, setPreviews] = useState<LayoutPreview[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [layoutsData, previewsData] = await Promise.all([
          layoutService.getLayouts(),
          layoutService.getLayoutPreviews()
        ]);
        
        setData(layoutsData);
        setPreviews(previewsData);
      } catch (err) {
        setError('Ошибка при загрузке данных раскладок');
        console.error('Error fetching layouts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, previews, loading, error };
}
