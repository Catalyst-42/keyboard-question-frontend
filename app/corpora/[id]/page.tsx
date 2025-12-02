"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { BookText, Loader2, AlertCircle, FileText, Hash, Languages } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Corpus } from '@/api';
import { corpusService } from '@/lib/corpus-service';
import { layoutService } from '@/lib/layout-service';
import { H1 } from '@/components/ui/typography';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

export default function CorpusDetailPage() {
  const params = useParams();
  const corpusId = params.id as string;

  const [corpus, setCorpus] = useState<Corpus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load corpus data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [corpusData] = await Promise.all([
          corpusService.getCorpus(parseInt(corpusId)),
        ]);

        setCorpus(corpusData);
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

  // Number formatter
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };


  if (error || !corpus) {
    return (
      <div className="container py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || 'Корпус не найден'}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <H1>Корпус {corpus.name}</H1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left: description (2/3 on desktop, full width on mobile) */}
          <div className="xl:col-span-2">
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Описание</h2>
              <MarkdownRenderer>{corpus.description || "Описание отсутствует"}</MarkdownRenderer>
            </section>
          </div>

          {/* Right: statistics (1/3 on desktop, full width on mobile) */}
          <div className="xl:col-span-1">
            <Card className="w-full h-fit">
              <CardHeader>
                <CardTitle>Статистика</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Language */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Languages className="h-4 w-4 shrink-0" />
                        <span className="font-medium">Язык корпуса</span>
                      </div>
                      <div className="text-muted-foreground ml-7">{corpus.language}</div>
                    </div>
                  </div>

                  {/* Corpus size */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 shrink-0" />
                        <span className="font-medium">Размер корпуса</span>
                      </div>
                      <div className="text-muted-foreground ml-7">
                        {formatNumber(corpus.size)} символов
                      </div>
                    </div>
                  </div>

                  {/* Unique symbols */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Hash className="h-4 w-4 shrink-0" />
                        <span className="font-medium">Уникальные символы</span>
                      </div>
                      <div className="text-muted-foreground ml-7">
                        {formatNumber(corpus.unique_symbols)} символов
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}