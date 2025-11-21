'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MetricsFilters } from '@/components/metrics-filter';
import { MetricsTable } from '@/components/metrics-table';
import { useMetricData } from '@/hooks/use-metric-data';
import { corpusService } from '@/lib/corpus-service';
import { keyboardService } from '@/lib/keyboard-service';
import { Corpus, Keyboard } from '@/api';

export default function MetricsPage() {
  const { 
    data, 
    loading, 
    error,
    filters,
    columns,
    sortState,
    setCorpusFilter,
    setKeyboardFilter,
    onSortChange,
    onColumnVisibilityChange
  } = useMetricData();

  const [corpora, setCorpora] = useState<Corpus[]>([]);
  const [keyboards, setKeyboards] = useState<Keyboard[]>([]);
  const [loadingFilters, setLoadingFilters] = useState(true);

  // Load data for filters
  useEffect(() => {
    const loadFilterData = async () => {
      try {
        setLoadingFilters(true);
        const [corporaData, keyboardsData] = await Promise.all([
          corpusService.getCorpora(),
          keyboardService.getKeyboards()
        ]);
        setCorpora(corporaData);
        setKeyboards(keyboardsData);
      } catch (err) {
        console.error('Error loading filter data:', err);
      } finally {
        setLoadingFilters(false);
      }
    };

    loadFilterData();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Метрики раскладок</h1>
        </div>

        {/* Filters */}
        {!loadingFilters && (
          <MetricsFilters
            corpora={corpora}
            keyboards={keyboards}
            selectedCorpus={filters.corpus}
            selectedKeyboard={filters.keyboard}
            onCorpusChange={setCorpusFilter}
            onKeyboardChange={setKeyboardFilter}
          />
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Загрузка метрик...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Table */}
        {!loading && !error && data && data.length > 0 && (
          <MetricsTable
            metrics={data}
            columns={columns}
            sortState={sortState}
            onSortChange={onSortChange}
            onColumnVisibilityChange={onColumnVisibilityChange}
          />
        )}

        {/* No data */}
        {!loading && !error && data && data.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Метрики не найдены</CardTitle>
              <CardDescription>
                {filters.corpus !== 'all' || filters.keyboard !== 'all' 
                  ? 'Попробуйте изменить параметры фильтрации'
                  : 'Нет доступных метрик для отображения'
                }
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}