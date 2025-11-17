'use client';

import { Keyboard, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LayoutCard } from '@/components/layout-card';
import { useLayoutData } from '@/hooks/use-layout-data';

export default function LayoutsPage() {
  const { data, previews, loading, error } = useLayoutData();

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6">
        {/* Заголовок */}
        <div className="flex items-center space-x-2">
          <Keyboard className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Раскладки</h1>
        </div>

        {/* Состояние загрузки */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Загрузка раскладок...</span>
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
        {!loading && !error && data && data.length > 0 && (
          <>
            {/* Статистика */}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Всего раскладок: {data.length}</span>
              {previews && <span>Превью: {previews.length}</span>}
            </div>

            {/* Список раскладок */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.map((layout) => (
                <LayoutCard 
                  key={layout.id} 
                  layout={layout} 
                  previews={previews || undefined} 
                />
              ))}
            </div>
          </>
        )}

        {/* Нет данных */}
        {!loading && !error && data && data.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Раскладки не найдены</CardTitle>
              <CardDescription>
                Нет доступных раскладок для отображения
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}