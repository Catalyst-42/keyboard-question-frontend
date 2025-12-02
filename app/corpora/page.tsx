'use client';

import { Loader2, AlertCircle, Languages, FileText, Hash } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCorpusData } from '@/hooks/use-corpus-data';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { H1 } from '@/components/ui/typography';

export default function CorporaPage() {
  const { data: corpora, loading, error } = useCorpusData();

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  const [search, setSearch] = useState('');

  const filteredCorpora = useMemo(() => {
    if (!corpora) return [];

    return corpora.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.language.toLowerCase().includes(search.toLowerCase())
    );
  }, [corpora, search]);

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <H1>Корпуса</H1>

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}

        {/* Data */}
        {!loading && !error && corpora && (
          <>
            {/* Search Card */}
            <Card>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="search">Поиск</Label>
                  <div className="relative flex items-center">
                    <Input
                      id="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Корпус или язык"
                      className="w-full"
                    />
                    {search && (
                      <button
                        onClick={() => setSearch('')}
                        className="absolute right-3 text-muted-foreground hover:text-foreground"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Corpora Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCorpora.length === 0 ? (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  {search ? 'Корпуса по вашему запросу не найдены' : 'Нет доступных корпусов'}
                </div>
              ) : (
                filteredCorpora.map((corpus) => (
                  <Card key={corpus.id} className="flex flex-col h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        <Link
                          href={`/corpora/${corpus.id}`}
                          className="hover:underline"
                        >
                          {corpus.name}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                      {/* Language */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <Languages className="h-4 w-4 shrink-0" />
                            <span className="font-medium">Язык корпуса</span>
                          </div>
                          <div className="text-muted-foreground ml-7">
                            {corpus.language || 'Не указан'}
                          </div>
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
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}