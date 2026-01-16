'use client';

import { useState, useEffect } from 'react';
import { MetricWithRelations, FilterState, SortState, MetricColumn } from '@/api';
import { metricService } from '@/lib/metric-service';

// Default column configuration
const defaultColumns: MetricColumn[] = [
  {
    id: 'corpus_name',
    label: 'Корпус',
    isVisible: true,
    isNumeric: false
  },
  {
    id: 'keyboard_name',
    label: 'Клавиатура',
    isVisible: true,
    isNumeric: false
  },
  {
    id: 'layout_name',
    label: 'Раскладка',
    isVisible: true,
    isNumeric: false
  },

  // Travel distance
  {
    id: 'travel_distance',
    label: 'Общая дистанция',
    isVisible: true,
    isNumeric: true
  },
  {
    id: 'travel_distance_finger_1',
    label: 'Дистанция левого мизинца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'travel_distance_finger_2',
    label: 'Дистанция левого безымянного пальца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'travel_distance_finger_3',
    label: 'Дистанция левого среднего пальца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'travel_distance_finger_4',
    label: 'Дистанция левого указательного пальца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'travel_distance_finger_5',
    label: 'Дистанция левого большого пальца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'travel_distance_finger_6',
    label: 'Дистанция правого большого пальца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'travel_distance_finger_7',
    label: 'Дистанция правого указательного пальца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'travel_distance_finger_8',
    label: 'Дистанция правого среднего пальца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'travel_distance_finger_9',
    label: 'Дистанция правого безымянного пальца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'travel_distance_finger_10',
    label: 'Дистанция правого мизинца',
    isVisible: false,
    isNumeric: true
  },

  // Hand usage
  {
    id: 'finger_usage_1',
    label: 'Использование левого мизинца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'finger_usage_2',
    label: 'Использование левого безымянного пальца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'finger_usage_3',
    label: 'Использование левого среднего пальца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'finger_usage_4',
    label: 'Использование левого указательного пальца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'finger_usage_5',
    label: 'Использование левого большого пальца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'finger_usage_6',
    label: 'Использование правого большого пальца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'finger_usage_7',
    label: 'Использование правого указательного пальца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'finger_usage_8',
    label: 'Использование правого среднего пальца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'finger_usage_9',
    label: 'Использование правого безымянного пальца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'finger_usage_10',
    label: 'Использование правого мизинца',
    isVisible: false,
    isNumeric: true
  },

  // Row usage
  {
    id: 'row_usage_k',
    label: 'Ряд K',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'row_usage_e',
    label: 'Ряд E',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'row_usage_d',
    label: 'Ряд D',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'row_usage_c',
    label: 'Ряд C',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'row_usage_b',
    label: 'Ряд B',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'row_usage_a',
    label: 'Ряд A',
    isVisible: false,
    isNumeric: true
  },

  // Trigrams
  {
    id: 'roll_frequency',
    label: 'Роллинг',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'alternate_frequency',
    label: 'Чередование',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'onehand_frequency',
    label: 'Полный роллинг',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'redirect_frequency',
    label: 'Редиректы',
    isVisible: false,
    isNumeric: true
  },

  // Bigrams
  {
    id: 'same_finger_bigram_frequency',
    label: 'Однопальцевые биграммы',
    isVisible: true,
    isNumeric: true
  },
  {
    id: 'same_finger_bigram_mean_distance',
    label: 'Средняя дистанция биграмм одного пальца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'half_scissor_bigram_frequency',
    label: 'Полу-ножницы биграмм',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'full_scissor_bigram_frequency',
    label: 'Ножницы биграмм',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'lateral_stretch_bigram_frequency',
    label: 'Боковое растяжение биграмм',
    isVisible: false,
    isNumeric: true
  },

  // Skipgrams
  {
    id: 'same_finger_skipgram_frequency',
    label: 'Однопальцевые скипграммы',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'same_finger_skipgram_mean_distance',
    label: 'Средняя дистанция скипграмм одного пальца',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'half_scissor_skipgram_frequency',
    label: 'Полу-ножницы скипграмм',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'full_scissor_skipgram_frequency',
    label: 'Полные ножницы скипграмм',
    isVisible: false,
    isNumeric: true
  },
  {
    id: 'lateral_stretch_skipgram_frequency',
    label: 'Боковое растяжение скипграмм',
    isVisible: false,
    isNumeric: true
  }
];

export function useMetricData() {
  const [data, setData] = useState<MetricWithRelations[] | null>(null);
  const [filteredData, setFilteredData] = useState<MetricWithRelations[] | null>(null);
  const [sortedData, setSortedData] = useState<MetricWithRelations[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    corpus: 'all',
    keyboard: 'all',
    layout: 'all',
  });
  const [textFilter, setTextFilter] = useState<string>('');

  const [sortState, setSortState] = useState<SortState>({
    column: 'same_finger_bigram_frequency',
    direction: 'asc',
  });

  const [columns, setColumns] = useState<MetricColumn[]>(defaultColumns);

  // Load data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await metricService.getMetrics();
        setData(result);
        setFilteredData(result);
      } catch (err) {
        setError('Ошибка при загрузке данных метрик');
        console.error('Error fetching metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters
  useEffect(() => {
    if (!data) return;

    let filtered = [...data];

    if (filters.corpus !== 'all') {
      filtered = filtered.filter(metric => metric.corpus.toString() === filters.corpus);
    }

    if (filters.keyboard !== 'all') {
      filtered = filtered.filter(metric => metric.keyboard.toString() === filters.keyboard);
    }

    if (filters.layout && filters.layout !== 'all') {
      filtered = filtered.filter(metric => metric.layout.toString() === filters.layout);
    }

    // Apply text filter last — search across layout_name, keyboard_name, corpus_name
    if (textFilter && textFilter.trim() !== '') {
      const q = textFilter.trim().toLowerCase();
      filtered = filtered.filter(metric => {
        const layout = String(metric.layout_name || '').toLowerCase();
        const keyboard = String(metric.keyboard_name || '').toLowerCase();
        const corpus = String(metric.corpus_name || '').toLowerCase();
        return layout.includes(q) || keyboard.includes(q) || corpus.includes(q);
      });
    }

    setFilteredData(filtered);
  }, [data, filters, textFilter]);


  // Sort data
  useEffect(() => {
    if (!filteredData) return;

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[sortState.column as keyof MetricWithRelations];
      const bValue = b[sortState.column as keyof MetricWithRelations];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortState.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const aString = String(aValue || '');
      const bString = String(bValue || '');

      return sortState.direction === 'asc'
        ? aString.localeCompare(bString)
        : bString.localeCompare(aString);
    });

    setSortedData(sorted);
  }, [filteredData, sortState]);

  // Control functions
  const setCorpusFilter = (corpus: string) => {
    setFilters(prev => ({ ...prev, corpus }));
  };

  const setKeyboardFilter = (keyboard: string) => {
    setFilters(prev => ({ ...prev, keyboard }));
  };

  const setLayoutFilter = (layout: string) => {
    setFilters(prev => ({ ...prev, layout }));
  };

  const handleSortChange = (sort: SortState) => {
    setSortState(sort);
  };

  const handleColumnVisibilityChange = (columnId: string, isVisible: boolean) => {
    setColumns(prev =>
      prev.map(col =>
        col.id === columnId ? { ...col, isVisible } : col
      )
    );
  };

  return {
    data: sortedData,
    allData: data,
    loading,
    error,
    filters,
    columns,
    sortState,
    setCorpusFilter,
    setKeyboardFilter,
    setLayoutFilter,
    setTextFilter,
    textFilter,
    onSortChange: handleSortChange,
    onColumnVisibilityChange: handleColumnVisibilityChange
  };
}
