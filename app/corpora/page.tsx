'use client';

import { BookText, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useCorpusData } from '@/hooks/use-corpus-data';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function CorporaPage() {
  const { data: corpora, loading, error } = useCorpusData();

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'size'>('name');

  const visible = useMemo(() => {
    if (!corpora) return [];
    return corpora
      .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.size || 0) - (a.size || 0);
      });
  }, [corpora, search, sortBy]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <BookText className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Corpora</h1>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Loading corpora...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Data */}
        {!loading && !error && corpora && (
          <>
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">Total corpora: {visible.length}</div>
              <div className="flex items-center gap-2">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search corpora"
                  className="border px-2 py-1 rounded text-sm"
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border px-2 py-1 rounded text-sm"
                >
                  <option value="name">Sort: Name</option>
                  <option value="size">Sort: Size</option>
                </select>
              </div>
            </div>

            <Accordion type="multiple" defaultValue={visible.map((c) => String(c.id))}>
              {visible.map((corpus) => (
                <AccordionItem key={corpus.id} value={String(corpus.id)}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-3 w-full">
                      <BookText className="h-5 w-5" />
                      <span className="font-medium">{corpus.name}</span>
                      <span className="ml-auto text-sm text-muted-foreground">{corpus.language}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <article className="prose-sm">
                      <ul>
                        <li>Unique symbols: {formatNumber(corpus.unique_symbols)}</li>
                        <li>Total size: {formatNumber(corpus.size)}</li>
                        <li>Language: {corpus.language}</li>
                      </ul>
                      <p className="mt-2 text-sm text-muted-foreground">{corpus.description}</p>
                      <div className="mt-2">
                        <Link href={`/corpora/${corpus.id}`} className="text-sm text-primary hover:underline">
                          Details →
                        </Link>
                      </div>
                    </article>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </>
        )}

        {/* No data */}
        {!loading && !error && (!corpora || corpora.length === 0) && (
          <div className="p-4 bg-muted rounded-md">
            No corpora available
          </div>
        )}
      </div>
    </div>
  );
}