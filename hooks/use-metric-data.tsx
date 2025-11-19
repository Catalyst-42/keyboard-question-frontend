'use client';

import { useState, useEffect } from 'react';
import { MetricWithRelations, FilterState, SortState, MetricColumn } from '@/api';
import { metricService } from '@/lib/metric-service';

// Конфигурация колонок по умолчанию
const defaultColumns: MetricColumn[] = [
  { id: 'layout_name', label: 'Раскладка', isVisible: true, isNumeric: false },
  { id: 'keyboard_name', label: 'Клавиатура', isVisible: true, isNumeric: false },
  { id: 'corpus_name', label: 'Корпус', isVisible: true, isNumeric: false },
  { id: 'travel_distance', label: 'Дистанция', isVisible: true, isNumeric: true },
  { id: 'same_finger_bigram_frequency', label: 'SFB', isVisible: true, isNumeric: true },
  { id: 'same_finger_skipgram_frequency', label: 'SFS', isVisible: true, isNumeric: true },
  { id: 'roll_frequency', label: 'Rolls', isVisible: true, isNumeric: true },
  { id: 'alternate_frequency', label: 'Alternate', isVisible: true, isNumeric: true },
  { id: 'onehand_frequency', label: 'One Hand', isVisible: true, isNumeric: true },
  { id: 'redirect_frequency', label: 'Redirect', isVisible: true, isNumeric: true },
  { id: 'half_scissor_bigram_frequency', label: 'Half Scissors', isVisible: true, isNumeric: true },
  { id: 'full_scissor_bigram_frequency', label: 'Full Scissors', isVisible: true, isNumeric: true },
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
  });
  
  const [sortState, setSortState] = useState<SortState>({
    column: 'travel_distance',
    direction: 'asc',
  });
  
  const [columns, setColumns] = useState<MetricColumn[]>(defaultColumns);

  // Загрузка данных
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

  // Применение фильтров
  useEffect(() => {
    if (!data) return;

    let filtered = [...data];

    if (filters.corpus !== 'all') {
      filtered = filtered.filter(metric => metric.corpus.toString() === filters.corpus);
    }

    if (filters.keyboard !== 'all') {
      filtered = filtered.filter(metric => metric.keyboard.toString() === filters.keyboard);
    }

    setFilteredData(filtered);
  }, [data, filters]);

  // Сортировка данных
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

  // Функции для управления
  const setCorpusFilter = (corpus: string) => {
    setFilters(prev => ({ ...prev, corpus }));
  };

  const setKeyboardFilter = (keyboard: string) => {
    setFilters(prev => ({ ...prev, keyboard }));
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
    onSortChange: handleSortChange,
    onColumnVisibilityChange: handleColumnVisibilityChange
  };
}