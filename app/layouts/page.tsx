'use client';

import { Loader2, AlertCircle, Keyboard as KeyboardIcon, Languages, FileText, Image as ImageIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { H1 } from '@/components/ui/h1';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLayoutData } from '@/hooks/use-layout-data';
import { useKeyboardData } from '@/hooks/use-keyboard-data';
import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState, useEffect } from 'react';

export default function LayoutsPage() {
  const { data: layouts, previews, loading, error } = useLayoutData();
  const { data: keyboards } = useKeyboardData();

  const [search, setSearch] = useState('');
  const [selectedKeyboard, setSelectedKeyboard] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');

  // Set first keyboard as default when keyboards are loaded
  useEffect(() => {
    if (keyboards && keyboards.length > 0 && !selectedKeyboard) {
      setSelectedKeyboard(keyboards[0].id.toString());
    }
  }, [keyboards, selectedKeyboard]);

  const filteredLayouts = useMemo(() => {
    if (!layouts) return [];

    let filtered = layouts.filter((layout) =>
      layout.name.toLowerCase().includes(search.toLowerCase())
    );

    // Filter by language
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter((layout) => layout.language === selectedLanguage);
    }

    return filtered;
  }, [layouts, search, selectedLanguage]);

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <H1>Раскладки</H1>

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Data */}
        {!loading && !error && layouts && (
          <>
            {/* Search and Filter Card */}
            <Card>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Search input */}
                  <div className="space-y-2">
                    <Label htmlFor="search">Поиск</Label>
                    <div className="relative flex items-center">
                      <Input
                        id="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Раскладка"
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

                  {/* Language filter */}
                  <div className="space-y-2">
                    <Label htmlFor="language-filter">Язык</Label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger id="language-filter" className="w-full">
                        <SelectValue placeholder="Любой" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Любой</SelectItem>
                        <SelectItem value="ru">Русский</SelectItem>
                        <SelectItem value="en">Английский</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Keyboard selector for preview */}
                  <div className="space-y-2">
                    <Label htmlFor="keyboard-select">Превью</Label>
                    <Select value={selectedKeyboard} onValueChange={setSelectedKeyboard}>
                      <SelectTrigger id="keyboard-select" className="w-full">
                        <SelectValue placeholder={keyboards?.length ? "Выберите клавиатуру" : "Загрузка..."} />
                      </SelectTrigger>
                      <SelectContent>
                        {keyboards?.map((keyboard) => (
                          <SelectItem key={keyboard.id} value={keyboard.id.toString()}>
                            {keyboard.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layouts Cards Grid */}
            <div className="grid grid-cols-1 gap-4">
              {filteredLayouts.length === 0 ? (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  {search || selectedLanguage !== 'all'
                    ? 'Раскладки по вашему запросу не найдены'
                    : 'Нет доступных раскладок'
                  }
                </div>
              ) : (
                filteredLayouts.map((layout) => (
                  <LayoutCard
                    key={layout.id}
                    layout={layout}
                    previews={previews || []}
                    selectedKeyboard={selectedKeyboard}
                  />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function LayoutCard({ layout, previews, selectedKeyboard }: {
  layout: any;
  previews: any[];
  selectedKeyboard: string;
}) {
  // Find preview for this layout and selected keyboard
  const layoutPreview = useMemo(() => {
    if (!selectedKeyboard) return null;

    const layoutPreviews = previews.filter(p => p.layout === layout.id);
    return layoutPreviews.find(p => p.keyboard.toString() === selectedKeyboard);
  }, [previews, layout.id, selectedKeyboard]);

  return (
    <Card className="flex flex-col h-full">
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Layout Preview - 2/3 width */}
          <div className="lg:col-span-2 flex items-center justify-center">
            {layoutPreview ? (
              <Link
                href={`/layouts/${layout.id}`}
                className="relative w-full aspect-23/9 rounded-md overflow-hidden"
              >
                <Image
                  src={layoutPreview.layout_preview}
                  alt={`Превью раскладки ${layout.name} на выбранной клавиатуре`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </Link>
            ) : (
              <div className="w-full aspect-video rounded-md border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Превью недоступно</p>
                  <p className="text-xs">для выбранной клавиатуры</p>
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Layout Name */}
            <div>
              <CardTitle className="text-lg mb-4">
                <Link
                  href={`/layouts/${layout.id}`}
                >
                  {layout.name}
                </Link>
              </CardTitle>
            </div>

            <div className="space-y-4">
              {/* Language */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <Languages className="h-4 w-4 shrink-0" />
                    <span className="font-medium">Язык</span>
                  </div>
                  <div className="text-muted-foreground ml-7">
                    {layout.language === 'ru' ? 'Русский' :
                      layout.language === 'en' ? 'Английский' :
                        layout.language || 'Не указан'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
