'use client';

import { Keyboard } from '@/api';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DownloadButton from '@/components/ui/download-button';
import { keyboardService } from '@/lib/keyboard-service';
import { AlertCircle, FileText, Monitor, Rows3, SquareDot } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function KeyboardDetailPage() {
  const params = useParams();
  const keyboardId = params.id as string;

  const [keyboard, setKeyboard] = useState<Keyboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [keyboardData] = await Promise.all([
          keyboardService.getKeyboard(parseInt(keyboardId)),
        ]);

        setKeyboard(keyboardData);
      } catch (err) {
        setError('Ошибка при загрузке данных клавиатуры');
        console.error('Error loading keyboard:', err);
      } finally {
        setLoading(false);
      }
    };

    if (keyboardId) {
      loadData();
    }
  }, [keyboardId]);

  if (loading) {
    return (
      <></>
    );
  }

  if (error || !keyboard) {
    return (
      <div className="container py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-5 w-5" />
          <AlertDescription>
            {error || 'Клавиатура не найдена'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-left gap-3">
            <h1 className="text-4xl font-bold">Клавиатура {keyboard.name}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Превью</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                {keyboard.keyboard_preview && (
                  <div className="relative w-full overflow-hidden rounded-md aspect-23/9">
                    <Image
                      src={keyboard.keyboard_preview}
                      alt={`Превью клавиатуры ${keyboard.name}`}
                      fill
                      className="object-contain"
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: specifications (1/3) */}
          <aside className="md:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Характеристики</CardTitle>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Monitor className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Форм-фактор</span>
                    </div>
                    <div className="text-muted-foreground ml-7">{keyboard.form_factor}</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <SquareDot className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Количество клавиш</span>
                    </div>
                    <div className="text-muted-foreground ml-7">{keyboard.keys}</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Rows3 className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Количество рядов</span>
                    </div>
                    <div className="text-muted-foreground ml-7">{keyboard.rows}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Файл модели</div>
                      <div className="text-muted-foreground">
                        {keyboard.keyboard_model.split('/').pop()}
                      </div>
                    </div>
                  </div>
                  <DownloadButton href={keyboard.keyboard_model} aria-label={`Скачать модель ${keyboard.name}`} />
                </div>
                </CardContent>
            </Card>
          </aside>
        </div>

        {/* Description */}
        {keyboard.description && (
          <section className="prose prose-gray max-w-none mt-6">
            <h2 className="text-lg font-semibold mb-4">Описание</h2>
            <p className="leading-relaxed whitespace-pre-wrap">
              {keyboard.description}
            </p>
          </section>
        )}

        {/* Features */}
        {keyboard.features && (
          <section className="prose prose-gray max-w-none mt-6">
            <h2 className="text-lg font-semibold mb-4">Особенности</h2>
            <p className="leading-relaxed whitespace-pre-wrap">
              {keyboard.features}
            </p>
          </section>
        )}

      </div>
    </div>
  );
}
