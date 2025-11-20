'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { BookText, Loader2, AlertCircle, FileText, Languages, Hash, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Corpus, Layout } from '@/api';
import { corpusService } from '@/lib/corpus-service';
import { layoutService } from '@/lib/layout-service';
import Link from 'next/link';

export default function CorpusDetailPage() {
  const params = useParams();
  const corpusId = params.id as string;

  const [corpus, setCorpus] = useState<Corpus | null>(null);
  const [layouts, setLayouts] = useState<Layout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка данных корпуса и раскладок
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [corpusData, allLayoutsData] = await Promise.all([
          corpusService.getCorpus(parseInt(corpusId)),
          layoutService.getLayouts()
        ]);

        setCorpus(corpusData);

        // Фильтруем раскладки по языку корпуса
        const filteredLayouts = allLayoutsData.filter(
          layout => layout.language.toLowerCase() === corpusData.language.toLowerCase()
        );
        setLayouts(filteredLayouts);
      } catch (err) {
        setError('Ошибка при загрузке данных корпуса');
        console.error('Error loading corpus:', err);
      } finally {
        setLoading(false);
      }
    };

    if (corpusId) {
      loadData();
    }
  }, [corpusId]);

  // Функция для форматирования чисел
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Загрузка корпуса...</span>
        </div>
      </div>
    );
  }

  if (error || !corpus) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || 'Корпус не найден'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-8">
        {/* Заголовок и навигация */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookText className="h-6 w-6" />
            <h1 className="text-3xl font-bold">{corpus.name}</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            Язык: {corpus.language}
          </div>
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Левая колонка - информация о корпусе */}
          <div className="lg:col-span-2 space-y-6">
            {/* Основная информация */}
            <Card>
              <CardHeader>
                <CardTitle>Информация о корпусе</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Размер корпуса</div>
                        <div className="text-2xl font-bold">{formatNumber(corpus.size)}</div>
                        <div className="text-sm text-muted-foreground">символов</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Hash className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Уникальных символов</div>
                        <div className="text-2xl font-bold">{formatNumber(corpus.unique_symbols)}</div>
                        <div className="text-sm text-muted-foreground">разных символов</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Languages className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Язык</div>
                        <div className="text-2xl font-bold">{corpus.language}</div>
                        <div className="text-sm text-muted-foreground">код языка</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Описание */}
            {corpus.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Описание</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{corpus.description}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Правая колонка - статистика */}
          <div className="space-y-6">
            {/* Статистика */}
            <Card>
              <CardHeader>
                <CardTitle>Статистика</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Средняя длина</span>
                  <span className="font-mono text-sm">
                    {formatNumber(Math.round(corpus.size / corpus.unique_symbols))}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Быстрые действия */}
            <Card>
              <CardHeader>
                <CardTitle>Навигация</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link 
                    href="/metrics" 
                    className="flex items-center gap-2 p-2 text-sm hover:bg-muted rounded-md transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Метрики этого корпуса
                  </Link>
                  <Link 
                    href="/layouts" 
                    className="flex items-center gap-2 p-2 text-sm hover:bg-muted rounded-md transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Все раскладки
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Секция раскладок для этого языка */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold">Раскладки для {corpus.language}</h2>
              <span className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-sm">
                {layouts.length} шт.
              </span>
            </div>
          </div>

          {/* Список раскладок */}
          {layouts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {layouts.map((layout) => (
                <Card key={layout.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      <Link 
                        href={`/layouts/${layout.id}`}
                        className="hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        {layout.name}
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      {layout.language} • {layout.layout_model.split('/').pop()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {layout.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {layout.description}
                      </p>
                    )}
                    <Link 
                      href={`/layouts/${layout.id}`}
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Подробнее
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Нет раскладок для языка {corpus.language}</p>
                  <p className="text-sm mt-2">
                    Раскладки появятся после их добавления в систему
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}