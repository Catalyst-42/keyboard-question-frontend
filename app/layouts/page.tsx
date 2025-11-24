'use client';

import { Keyboard, Loader2, AlertCircle, Eye } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLayoutData } from '@/hooks/use-layout-data';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function LayoutsPage() {
  const { data, previews, loading, error } = useLayoutData();

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <Keyboard className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Раскладки</h1>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Загрузка раскладок...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Data */}
        {!loading && !error && data && data.length > 0 && (
          <>
            <LayoutsFilters layouts={data} />
            <LayoutsList layouts={data} previews={previews || undefined} />
          </>
        )}

        {/* No data */}
        {!loading && !error && data && data.length === 0 && (
          <div className="p-4 bg-muted rounded">Нет доступных раскладок</div>
        )}
      </div>
    </div>
  );
}

function LayoutsFilters({ layouts }: { layouts: any[] }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'language'>('name');

  const languages = useMemo(() => {
    const uniqueLanguages = Array.from(new Set(layouts.map(l => l.language).filter(Boolean)));
    return uniqueLanguages.sort();
  }, [layouts]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Фильтрация и сортировка</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search input */}
          <div className="space-y-2 flex-1 min-w-[200px]">
            <Label htmlFor="layout-search">Поиск по названию</Label>
            <div className="relative flex items-center">
              <Input
                id="layout-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Введите название раскладки"
                className="w-full"
              />
              {search && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setSearch('')}
                  className="absolute right-1 h-6 w-6 p-0"
                >
                  ×
                </Button>
              )}
            </div>
          </div>

          {/* Language filter */}
          <div className="space-y-2 flex-1 min-w-[200px]">
            <Label htmlFor="language-filter">Язык</Label>
            <Select value={sortBy} onValueChange={(value: 'name' | 'language') => setSortBy(value)}>
              <SelectTrigger id="language-filter" className="w-full">
                <SelectValue placeholder="Все языки" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все языки</SelectItem>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort by */}
          <div className="space-y-2 flex-1 min-w-[200px]">
            <Label htmlFor="sort-filter">Сортировка</Label>
            <Select value={sortBy} onValueChange={(value: 'name' | 'language') => setSortBy(value)}>
              <SelectTrigger id="sort-filter" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">По названию</SelectItem>
                <SelectItem value="language">По языку</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
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
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Найдено раскладок: {visible.length}
        </div>
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
                  <ul className="space-y-1">
                    <li className="text-sm">
                      <span className="font-medium">Модель:</span> {layout.layout_model?.split('/').pop()}
                    </li>
                    <li className="text-sm">
                      <span className="font-medium">Превью:</span> {layoutPreviews.length}
                    </li>
                  </ul>
                  <div className="mt-3">
                    <Link 
                      href={`/layouts/${layout.id}`} 
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      Подробнее →
                    </Link>
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