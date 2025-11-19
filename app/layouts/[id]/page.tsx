'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Keyboard, Loader2, AlertCircle, Download, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Layout, LayoutPreview, Keyboard as KeyboardType, MetricWithRelations } from '@/api';
import { layoutService } from '@/lib/layout-service';
import { keyboardService } from '@/lib/keyboard-service';
import { metricService } from '@/lib/metric-service';
import { MetricDetails } from '@/components/metric-details';
import { MetricsCharts } from '@/components/metric-charts';
import Image from 'next/image';

export default function LayoutDetailPage() {
  const params = useParams();
  const layoutId = params.id as string;

  const [layout, setLayout] = useState<Layout | null>(null);
  const [previews, setPreviews] = useState<LayoutPreview[]>([]);
  const [keyboards, setKeyboards] = useState<KeyboardType[]>([]);
  const [corpora, setCorpora] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<MetricWithRelations[]>([]);
  
  const [selectedKeyboard, setSelectedKeyboard] = useState<string>('');
  const [selectedCorpus, setSelectedCorpus] = useState<string>('');
  const [selectedMetric, setSelectedMetric] = useState<MetricWithRelations | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка данных
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [layoutData, previewsData, keyboardsData, metricsData] = await Promise.all([
          layoutService.getLayout(parseInt(layoutId)),
          layoutService.getLayoutPreviews(),
          keyboardService.getKeyboards(),
          metricService.getMetrics()
        ]);

        setLayout(layoutData);
        setPreviews(previewsData);
        setKeyboards(keyboardsData);
        setMetrics(metricsData.filter(metric => metric.layout === parseInt(layoutId)));

        // Уникальные корпуса из метрик
        const uniqueCorpora = Array.from(new Set(
          metricsData
            .filter(metric => metric.layout === parseInt(layoutId))
            .map(metric => metric.corpus)
        )).map(corpusId => ({
          id: corpusId,
          name: metricsData.find(m => m.corpus === corpusId)?.corpus_name || `Корпус ${corpusId}`
        }));

        setCorpora(uniqueCorpora);

        // Выбираем первые значения по умолчанию
        if (keyboardsData.length > 0) {
          setSelectedKeyboard(keyboardsData[0].id.toString());
        }
        if (uniqueCorpora.length > 0) {
          setSelectedCorpus(uniqueCorpora[0].id.toString());
        }

      } catch (err) {
        setError('Ошибка при загрузке данных раскладки');
        console.error('Error loading layout:', err);
      } finally {
        setLoading(false);
      }
    };

    if (layoutId) {
      loadData();
    }
  }, [layoutId]);

  // Обновление выбранной метрики при изменении фильтров
  useEffect(() => {
    if (selectedKeyboard && selectedCorpus) {
      const metric = metrics.find(
        m => m.keyboard.toString() === selectedKeyboard && 
             m.corpus.toString() === selectedCorpus
      );
      setSelectedMetric(metric || null);
    }
  }, [selectedKeyboard, selectedCorpus, metrics]);

  // Получаем превью для выбранной клавиатуры
  const selectedPreview = previews.find(
    preview => preview.layout === parseInt(layoutId) && 
               preview.keyboard === parseInt(selectedKeyboard)
  );

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Загрузка раскладки...</span>
        </div>
      </div>
    );
  }

  if (error || !layout) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || 'Раскладка не найдена'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-8">
        {/* Заголовок и навигация */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Keyboard className="h-6 w-6" />
            <h1 className="text-3xl font-bold">{layout.name}</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            Язык: {layout.language}
          </div>
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка - превью и информация */}
          <div className="lg:col-span-2 space-y-6">
            {/* Превью раскладки */}
            <Card>
              <CardHeader>
                <CardTitle>Превью раскладки</CardTitle>
                <CardDescription>
                  {selectedKeyboard ? `На клавиатуре: ${keyboards.find(k => k.id.toString() === selectedKeyboard)?.name}` : 'Выберите клавиатуру'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedPreview ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-md border">
                    <Image
                      src={selectedPreview.layout_preview}
                      alt={`Превью ${layout.name}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="aspect-video flex items-center justify-center border rounded-md bg-muted/50">
                    <p className="text-muted-foreground">
                      Превью для выбранной клавиатуры не найдено
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Описание */}
            {layout.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Описание</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{layout.description}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Правая колонка - управление и информация */}
          <div className="space-y-6">
            {/* Выбор клавиатуры */}
            <Card>
              <CardHeader>
                <CardTitle>Форм-фактор</CardTitle>
                <CardDescription>
                  Выберите клавиатуру для отображения превью
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Label htmlFor="keyboard-select">Клавиатура</Label>
                  <Select value={selectedKeyboard} onValueChange={setSelectedKeyboard}>
                    <SelectTrigger id="keyboard-select">
                      <SelectValue placeholder="Выберите клавиатуру" />
                    </SelectTrigger>
                    <SelectContent>
                      {keyboards.map((keyboard) => (
                        <SelectItem key={keyboard.id} value={keyboard.id.toString()}>
                          {keyboard.name} ({keyboard.form_factor})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Информация о модели */}
            <Card>
              <CardHeader>
                <CardTitle>Файл модели</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {layout.layout_model.split('/').pop()}
                    </span>
                  </div>
                  <a
                    href={layout.layout_model}
                    download
                    className="text-sm text-primary hover:underline"
                  >
                    Скачать
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Разделитель */}
        <Separator />

        {/* Секция метрик */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6" />
            <h2 className="text-2xl font-bold">Метрики раскладки</h2>
          </div>

          {/* Выбор параметров для метрик */}
          <Card>
            <CardHeader>
              <CardTitle>Параметры метрик</CardTitle>
              <CardDescription>
                Выберите корпус и клавиатуру для отображения метрик
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="corpus-select">Корпус</Label>
                  <Select value={selectedCorpus} onValueChange={setSelectedCorpus}>
                    <SelectTrigger id="corpus-select">
                      <SelectValue placeholder="Выберите корпус" />
                    </SelectTrigger>
                    <SelectContent>
                      {corpora.map((corpus) => (
                        <SelectItem key={corpus.id} value={corpus.id.toString()}>
                          {corpus.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metric-keyboard-select">Клавиатура</Label>
                  <Select value={selectedKeyboard} onValueChange={setSelectedKeyboard}>
                    <SelectTrigger id="metric-keyboard-select">
                      <SelectValue placeholder="Выберите клавиатуру" />
                    </SelectTrigger>
                    <SelectContent>
                      {keyboards.map((keyboard) => (
                        <SelectItem key={keyboard.id} value={keyboard.id.toString()}>
                          {keyboard.name} ({keyboard.form_factor})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Отображение метрик */}
          {selectedMetric ? (
            <div className="space-y-6">
              {/* Детали метрик */}
              <MetricDetails metric={selectedMetric} />
              
              {/* Графики */}
              <MetricsCharts metric={selectedMetric} />
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground py-8">
                  {selectedKeyboard && selectedCorpus 
                    ? 'Метрики для выбранных параметров не найдены'
                    : 'Выберите корпус и клавиатуру для отображения метрик'
                  }
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}