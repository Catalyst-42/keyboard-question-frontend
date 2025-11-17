'use client';

import { BookText, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CorpusCard } from '@/components/corpus-card';
import { useCorpusData } from '@/hooks/use-corpus-data';

export default function CorporaPage() {
  const { data: corpora, loading, error } = useCorpusData();

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6">
        {/* Заголовок */}
        <div className="flex items-center space-x-2">
          <BookText className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Корпуса</h1>
        </div>

        {/* Состояние загрузки */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Загрузка корпусов...</span>
          </div>
        )}

        {/* Ошибка */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Данные */}
        {!loading && !error && corpora && (
          <>
            {/* Статистика */}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Всего корпусов: {corpora.length}</span>
            </div>

            {/* Список корпусов */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {corpora.map((corpus) => (
                <CorpusCard key={corpus.id} corpus={corpus} />
              ))}
            </div>
          </>
        )}

        {/* Нет данных */}
        {!loading && !error && (
          <Card>
            <CardHeader>
              <CardTitle>Корпусы не найдены</CardTitle>
              <CardDescription>
                Нет доступных корпусов для отображения
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}