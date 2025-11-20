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
import { LayoutNumericMetrics } from '@/components/layout-numeric-metrics';
import { layoutService } from '@/lib/layout-service';
import { keyboardService } from '@/lib/keyboard-service';
import { metricService } from '@/lib/metric-service';
import { corpusService } from '@/lib/corpus-service';
import { LayoutMetricsSelector } from '@/components/layout-metrics-selector';
import { LayoutMetricsCharts } from '@/components/layout-metrics-charts';
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
  const [currentMetric, setCurrentMetric] = useState<MetricWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка данных раскладки
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [layoutData, previewsData, keyboardsData, corporaData, metricsData] = await Promise.all([
          layoutService.getLayout(parseInt(layoutId)),
          layoutService.getLayoutPreviews(),
          keyboardService.getKeyboards(),
          corpusService.getCorpora(),
          metricService.getMetrics()
        ]);

        setLayout(layoutData);
        setPreviews(previewsData);
        setKeyboards(keyboardsData);
        setCorpora(corporaData);
        setMetrics(metricsData);

        // Выбираем первую клавиатуру и корпус по умолчанию
        if (keyboardsData.length > 0) {
          setSelectedKeyboard(keyboardsData[0].id.toString());
        }
        if (corporaData.length > 0) {
          setSelectedCorpus(corporaData[0].id.toString());
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

  // Поиск метрики при изменении выбора
  useEffect(() => {
    if (selectedKeyboard && selectedCorpus && metrics.length > 0) {
      const metric = metrics.find(m => 
        m.layout === parseInt(layoutId) &&
        m.keyboard === parseInt(selectedKeyboard) &&
        m.corpus === parseInt(selectedCorpus)
      );
      setCurrentMetric(metric || null);
    }
  }, [selectedKeyboard, selectedCorpus, metrics, layoutId]);

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Левая колонка - превью и информация */}
          <div className="lg:col-span-2 space-y-6">
            {/* Превью раскладки */}
            <Card>
              <CardHeader>
                <CardTitle>Превью раскладки</CardTitle>
                <CardDescription>
                  {selectedKeyboard ? `На клавиатуре: ${keyboards.find(k => k.id === parseInt(selectedKeyboard))?.name}` : 'Выберите клавиатуру'}
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
            {/* Выбор клавиатуры для превью */}
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
          <LayoutMetricsSelector
            corpora={corpora}
            keyboards={keyboards}
            selectedCorpus={selectedCorpus}
            selectedKeyboard={selectedKeyboard}
            onCorpusChange={setSelectedCorpus}
            onKeyboardChange={setSelectedKeyboard}
          />

          {/* Графики метрик */}
          {currentMetric ? (
            <>
            <LayoutMetricsCharts metric={currentMetric} />
            <LayoutNumericMetrics metric={currentMetric} />
            </>
          ) : (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Метрики не найдены для выбранных параметров</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}