'use client';

import { Keyboard } from '@/api';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DownloadButton from '@/components/ui/download-button';
import { H1 } from '@/components/ui/h1';
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
          <AlertCircle className="h-4 w-4" />
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
        <H1>Клавиатура {keyboard.name}</H1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Left: preview (2/3 on desktop, full width on mobile) */}
          <div className="xl:col-span-2">
            <Card className="h-full w-full">
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
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: specifications (1/3 on desktop, full width on mobile) */}
          <div className="lg:col-span-1">
            <Card className="h-full w-full">
              <CardHeader>
                <CardTitle>Свойства</CardTitle>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="space-y-3">
                  {/* Form factor */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Monitor className="h-4 w-4 shrink-0" />
                        <span className="font-medium">Форм фактор</span>
                      </div>
                      <div className="text-muted-foreground ml-7">{keyboard.form_factor}</div>
                    </div>
                  </div>

                  {/* Number of keys */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <SquareDot className="h-4 w-4 shrink-0" />
                        <span className="font-medium">Число клавиш</span>
                      </div>
                      <div className="text-muted-foreground ml-7">{keyboard.keys}</div>
                    </div>
                  </div>

                  {/* Number of rows */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Rows3 className="h-4 w-4 shrink-0" />
                        <span className="font-medium">Число рядов</span>
                      </div>
                      <div className="text-muted-foreground ml-7">{keyboard.rows}</div>
                    </div>
                  </div>

                  {/* Model file */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 shrink-0" />
                        <span className="font-medium">Файл модели</span>
                      </div>
                      <div className="text-muted-foreground ml-7">
                        {keyboard.keyboard_model.split('/').pop()}
                      </div>
                    </div>
                    <div className="flex items-center justify-center pl-3 self-stretch">
                      <DownloadButton
                        href={keyboard.keyboard_model}
                        aria-label={`Download ${keyboard.name} model`}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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