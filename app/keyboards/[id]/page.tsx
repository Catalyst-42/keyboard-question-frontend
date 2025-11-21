'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Keyboard as KeyboardIcon, Loader2, AlertCircle, Monitor, Grid3X3, Download, FileText, Settings } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Keyboard, LayoutPreview } from '@/api';
import { keyboardService } from '@/lib/keyboard-service';
import { layoutService } from '@/lib/layout-service';
import Image from 'next/image';
import Link from 'next/link';

export default function KeyboardDetailPage() {
  const params = useParams();
  const keyboardId = params.id as string;

  const [keyboard, setKeyboard] = useState<Keyboard | null>(null);
  const [previews, setPreviews] = useState<LayoutPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load keyboard data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [keyboardData, previewsData] = await Promise.all([
          keyboardService.getKeyboard(parseInt(keyboardId)),
          layoutService.getLayoutPreviews()
        ]);

        setKeyboard(keyboardData);
        
        // Filter previews for this keyboard
        const keyboardPreviews = previewsData.filter(
          preview => preview.keyboard === parseInt(keyboardId)
        );
        setPreviews(keyboardPreviews);
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
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Загрузка клавиатуры...</span>
        </div>
      </div>
    );
  }

  if (error || !keyboard) {
    return (
      <div className="container mx-auto py-8">
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
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <KeyboardIcon className="h-8 w-8" />
            <h1 className="text-4xl font-bold">{keyboard.name}</h1>
          </div>
            <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              <span>{keyboard.form_factor}</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Grid3X3 className="h-5 w-5" />
              <span>{keyboard.keys} клавиш</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Grid3X3 className="h-5 w-5" />
              <span>{keyboard.rows} рядов</span>
            </div>
          </div>
        </div>

        {/* Main image */}
        {keyboard.keyboard_preview && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted/50">
            <Image
              src={keyboard.keyboard_preview}
              alt={`Превью ${keyboard.name}`}
              fill
              className="object-contain"
              priority
            />
          </div>
        )}

        {/* Description */}
        {keyboard.description && (
          <section className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Описание</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {keyboard.description}
            </p>
          </section>
        )}

        <Separator />

        {/* Specifications */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Технические характеристики</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/50">
                <Monitor className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Форм-фактор</div>
                  <div className="text-muted-foreground">{keyboard.form_factor}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/50">
                <Grid3X3 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Количество клавиш</div>
                  <div className="text-muted-foreground">{keyboard.keys}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/50">
                <Grid3X3 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Количество рядов</div>
                  <div className="text-muted-foreground">{keyboard.rows}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/50">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Файл модели</div>
                  <div className="text-muted-foreground truncate">
                    {keyboard.keyboard_model.split('/').pop()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Model file */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Файлы</h2>
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Модель клавиатуры</div>
                <div className="text-sm text-muted-foreground">
                  {keyboard.keyboard_model.split('/').pop()}
                </div>
              </div>
            </div>
              <Button asChild variant="outline">
              <a href={keyboard.keyboard_model} download>
                <Download className="h-5 w-5 mr-2" />
                Скачать
              </a>
            </Button>
          </div>
        </section>

        <Separator />

        {/* Available layouts */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Доступные раскладки</h2>
            <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
              {previews.length} шт.
            </span>
          </div>

          {previews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {previews.map((preview) => (
                <div key={preview.id} className="group border rounded-lg overflow-hidden hover:shadow-md transition-all">
                  <div className="relative aspect-video bg-muted/50">
                    <Image
                      src={preview.layout_preview}
                      alt={`Превью раскладки для ${keyboard.name}`}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <Link 
                      href={`/layouts/${preview.layout}`}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      Перейти к раскладке →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/50">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">Нет доступных превью раскладок</p>
              <p className="text-sm text-muted-foreground mt-2">
                Превью появятся после добавления раскладок для этой клавиатуры
              </p>
            </div>
          )}
        </section>

        {/* Navigation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Исследовать дальше</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/keyboards" 
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <KeyboardIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <div className="font-medium">Все клавиатуры</div>
                  <div className="text-sm text-muted-foreground">Просмотр всех доступных клавиатур</div>
                </div>
              </div>
            </Link>

            <Link 
              href="/metrics" 
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <div className="font-medium">Метрики</div>
                  <div className="text-sm text-muted-foreground">Анализ эффективности раскладок</div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}