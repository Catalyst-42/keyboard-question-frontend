'use client';

import { Keyboard as KeyboardIcon, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { KeyboardCard } from '@/components/keyboard-card';
import { useKeyboardData } from '@/hooks/use-keyboard-data';

export default function KeyboardsPage() {
  const { data, loading, error } = useKeyboardData();

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6">
        {/* Заголовок */}
        <div className="flex items-center space-x-2">
          <KeyboardIcon className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Клавиатуры</h1>
        </div>

        {/* Состояние загрузки */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Загрузка клавиатур...</span>
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
              <span>Всего клавиатур: {data.length}</span>
            </div>

            {/* Список клавиатур - теперь вертикальный */}
            <div className="space-y-6">
              {data.map((keyboard) => (
                <KeyboardCard key={keyboard.id} keyboard={keyboard} />
              ))}
            </div>
          </>
        )}

        {/* Нет данных */}
        {!loading && !error && data && data.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Клавиатуры не найдены</CardTitle>
              <CardDescription>
                Нет доступных клавиатур для отображения
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}