'use client';

import { Corpus, Keyboard } from '@/api';
import { MetricsFilters } from '@/components/metric/metrics-filter';
import { MetricsTable } from '@/components/metric/metrics-table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { H1 } from '@/components/ui/h1';
import { useMetricData } from '@/hooks/use-metric-data';
import { corpusService } from '@/lib/corpus-service';
import { keyboardService } from '@/lib/keyboard-service';
import { layoutService } from '@/lib/layout-service';
import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    setLayoutFilter,
    setTextFilter,
    textFilter,
    onSortChange,
    onColumnVisibilityChange
  } = useMetricData();

  const [corpora, setCorpora] = useState<Corpus[]>([]);
  const [keyboards, setKeyboards] = useState<Keyboard[]>([]);
  const [layouts, setLayouts] = useState<any[]>([]);
  const [loadingFilters, setLoadingFilters] = useState(true);

  // Load data for filters
  useEffect(() => {
    const loadFilterData = async () => {
      try {
        setLoadingFilters(true);
        const [corporaData, keyboardsData, layoutsData] = await Promise.all([
          corpusService.getCorpora(),
          keyboardService.getKeyboards(),
          layoutService.getLayouts()
        ]);
        setCorpora(corporaData);
        setKeyboards(keyboardsData);
        setLayouts(layoutsData);
      } catch (err) {
        console.error('Error loading filter data:', err);
      } finally {
        setLoadingFilters(false);
      }
    };

    loadFilterData();
  }, []);

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <H1>Метрики раскладок</H1>

        {/* Filters */}
        {!loadingFilters && (
          <MetricsFilters
            corpora={corpora}
            keyboards={keyboards}
            layouts={layouts}
            selectedCorpus={filters.corpus}
            selectedKeyboard={filters.keyboard}
            selectedLayout={filters.layout}
            onCorpusChange={setCorpusFilter}
            onKeyboardChange={setKeyboardFilter}
            onLayoutChange={setLayoutFilter}
            selectedText={textFilter}
            onTextChange={setTextFilter}
          />
        )}

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Table */}
        {!loading && !error && data && (
          <MetricsTable
            metrics={data}
            columns={columns}
            sortState={sortState}
            onSortChange={onSortChange}
            onColumnVisibilityChange={onColumnVisibilityChange}
          />
        )}
      </div>
    </div>
  );
}
