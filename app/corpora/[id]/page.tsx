"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { BookText, Loader2, AlertCircle, FileText, Languages, Hash, ExternalLink } from 'lucide-react';
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

  // Load corpus and layouts
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [corpusData, allLayoutsData] = await Promise.all([
          corpusService.getCorpus(parseInt(corpusId)),
          layoutService.getLayouts(),
        ]);

        setCorpus(corpusData);

        // Filter layouts by corpus language
        const filteredLayouts = allLayoutsData.filter(
          (layout) => layout.language.toLowerCase() === corpusData.language.toLowerCase()
        );
        setLayouts(filteredLayouts);
      } catch (err) {
        setError('Error loading corpus');
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

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading corpus...</span>
        </div>
      </div>
    );
  }

  if (error || !corpus) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-5 w-5" />
          <AlertDescription>{error || 'Corpus not found'}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <article className="flex flex-col space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookText className="h-6 w-6" />
            <h1 className="text-3xl font-bold">{corpus.name}</h1>
          </div>
          <div className="text-sm text-muted-foreground">Language: {corpus.language}</div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <main className="lg:col-span-2 space-y-6">
            <section aria-labelledby="info" className="bg-card p-4 rounded-md">
              <h2 id="info" className="text-lg font-semibold">Corpus information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Corpus size</div>
                      <div className="text-2xl font-bold">{formatNumber(corpus.size)}</div>
                      <div className="text-sm text-muted-foreground">characters</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Hash className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Unique symbols</div>
                      <div className="text-2xl font-bold">{formatNumber(corpus.unique_symbols)}</div>
                      <div className="text-sm text-muted-foreground">different symbols</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Languages className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Language</div>
                      <div className="text-2xl font-bold">{corpus.language}</div>
                      <div className="text-sm text-muted-foreground">language code</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {corpus.description && (
              <section aria-labelledby="desc" className="bg-card p-4 rounded-md">
                <h2 id="desc" className="text-lg font-semibold">Description</h2>
                <p className="text-muted-foreground leading-relaxed mt-3">{corpus.description}</p>
              </section>
            )}
          </main>

          <aside className="space-y-6">
            <section className="bg-card p-4 rounded-md">
              <h3 className="text-lg font-semibold">Statistics</h3>
              <div className="mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average length</span>
                  <span className="font-mono text-sm">{formatNumber(Math.round(corpus.size / corpus.unique_symbols))}</span>
                </div>
              </div>
            </section>

            <nav className="bg-card p-4 rounded-md">
              <h3 className="text-lg font-semibold">Navigation</h3>
              <div className="space-y-2 mt-3">
                <Link
                  href="/metrics"
                  className="flex items-center gap-2 p-2 text-sm hover:bg-muted rounded-md transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                  Metrics for this corpus
                </Link>
                <Link
                  href="/layouts"
                  className="flex items-center gap-2 p-2 text-sm hover:bg-muted rounded-md transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                  All layouts
                </Link>
              </div>
            </nav>
          </aside>
        </div>

        <section>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold">Layouts for {corpus.language}</h2>
              <span className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-sm">{layouts.length}</span>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}