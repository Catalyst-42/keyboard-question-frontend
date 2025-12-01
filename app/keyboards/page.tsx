'use client';

import { Loader2, AlertCircle, Keyboard as KeyboardIcon, SquareDot, Rows3, Monitor } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { H1 } from '@/components/ui/h1';
import { useKeyboardData } from '@/hooks/use-keyboard-data';
import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';

export default function KeyboardsPage() {
  const { data: keyboards, loading, error } = useKeyboardData();

  const [search, setSearch] = useState('');

  const filteredKeyboards = useMemo(() => {
    if (!keyboards) return [];
    
    return keyboards.filter((k) => 
      k.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [keyboards, search]);

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <H1>Клавиатуры</H1>
        </div>

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Data */}
        {!loading && !error && keyboards && (
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
                      placeholder="Клавиатура"
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

            {/* Keyboards Cards Grid */}
            <div className="grid grid-cols-1 gap-4">
              {filteredKeyboards.length === 0 ? (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  {search ? 'Клавиатуры по вашему запросу не найдены' : 'Нет доступных клавиатур'}
                </div>
              ) : (
                filteredKeyboards.map((keyboard) => (
                  <Card key={keyboard.id} className="flex flex-col h-full">
                    <CardContent >
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Keyboard Preview - 2/3 width */}
                        <div className="lg:col-span-2 flex items-center justify-center">
                          {keyboard.keyboard_preview && (
                            <Link 
                              href={`/keyboards/${keyboard.id}`}
                              className="relative w-full aspect-23/9 rounded-md overflow-hidden"
                            >
                              <Image
                                src={keyboard.keyboard_preview}
                                alt={`Превью клавиатуры ${keyboard.name}`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 2048px) 100vw, 66vw"
                              />
                            </Link>
                          )}
                        </div>

                        <div className="lg:col-span-1 space-y-6">
                          {/* Name */}
                          <div>
                            <CardTitle className="text-lg mb-4">
                              <Link 
                                href={`/keyboards/${keyboard.id}`}
                              >
                                {keyboard.name}
                              </Link>
                            </CardTitle>
                          </div>

                          <div className="space-y-4">
                            {/* Form factor */}
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3">
                                  <Monitor className="h-4 w-4 shrink-0" />
                                  <span className="font-medium">Форм фактор</span>
                                </div>
                                <div className="text-muted-foreground ml-7">
                                  {keyboard.form_factor}
                                </div>
                              </div>
                            </div>

                            {/* Number of keys */}
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3">
                                  <SquareDot className="h-4 w-4 shrink-0" />
                                  <span className="font-medium">Число клавиш</span>
                                </div>
                                <div className="text-muted-foreground ml-7">
                                  {keyboard.keys}
                                </div>
                              </div>
                            </div>

                            {/* Number of rows */}
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3">
                                  <Rows3 className="h-4 w-4 shrink-0" />
                                  <span className="font-medium">Число рядов</span>
                                </div>
                                <div className="text-muted-foreground ml-7">
                                  {keyboard.rows}
                                </div>
                              </div>
                            </div>
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