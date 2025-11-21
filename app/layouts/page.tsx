'use client';

import { Keyboard, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLayoutData } from '@/hooks/use-layout-data';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function LayoutsPage() {
  const { data, previews, loading, error } = useLayoutData();

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6">
        {/* Заголовок */}
        <div className="flex items-center space-x-2">
          <Keyboard className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Layouts</h1>
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
            <AlertCircle className="h-5 w-5" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Данные */}
        {!loading && !error && data && data.length > 0 && (
          <>
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">Total layouts: {data.length}</div>
              <div className="flex items-center gap-2">
                <input placeholder="Search layouts" className="border px-2 py-1 rounded text-sm" onChange={() => {}} />
              </div>
            </div>

            <LayoutsList layouts={data} previews={previews || undefined} />
          </>
        )}

        {/* Нет данных */}
        {!loading && !error && data && data.length === 0 && (
          <div className="p-4 bg-muted rounded">No layouts available</div>
        )}
      </div>
    </div>
  );
}

function LayoutsList({ layouts, previews }: { layouts: any[]; previews?: any[] }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'language'>('name');

  const visible = useMemo(() => {
    return layouts
      .filter((l) => l.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => (sortBy === 'name' ? a.name.localeCompare(b.name) : (a.language || '').localeCompare(b.language || '')));
  }, [layouts, search, sortBy]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="border px-2 py-1 rounded text-sm" />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="border px-2 py-1 rounded text-sm">
          <option value="name">Sort: Name</option>
          <option value="language">Sort: Language</option>
        </select>
      </div>

      <Accordion type="multiple" defaultValue={visible.map((l) => String(l.id))}>
        {visible.map((layout) => {
          const layoutPreviews = (previews || []).filter((p) => p.layout === layout.id);
          return (
            <AccordionItem key={layout.id} value={String(layout.id)}>
              <AccordionTrigger>
                <div className="flex items-center gap-2 w-full">
                  <span className="font-medium">{layout.name}</span>
                  <span className="ml-auto text-sm text-muted-foreground">{layout.language}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <article className="prose-sm">
                  {layout.description && <p className="text-muted-foreground">{layout.description}</p>}
                  <ul>
                    <li>Model: {layout.layout_model?.split('/').pop()}</li>
                    <li>Previews: {layoutPreviews.length}</li>
                  </ul>
                  <div className="mt-2">
                    <Link href={`/layouts/${layout.id}`} className="text-sm text-primary hover:underline">Details →</Link>
                  </div>
                </article>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}