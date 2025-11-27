'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  AlertCircle,
  Download,
  BarChart3,
  ImageIcon,
  FileText,
  Layers2,
  Thermometer,
  Flame
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Alert,
  AlertDescription
} from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { H1 } from '@/components/ui/h1';
import {
  Layout,
  LayoutPreview,
  Keyboard as KeyboardType,
  MetricWithRelations
} from '@/api';

import { LayoutMetricsSelector } from '@/components/layout-metrics-selector';
import { layoutService } from '@/lib/layout-service';
import { keyboardService } from '@/lib/keyboard-service';
import { metricService } from '@/lib/metric-service';
import { corpusService } from '@/lib/corpus-service';
import Image from 'next/image';
import DownloadButton from '@/components/ui/download-button';
import { LayoutMetrics } from '@/components/layout-metrics';

export default function LayoutDetailPage() {
  const params = useParams();
  const layoutId = params.id as string;
  const [layout, setLayout] = useState<Layout | null>(null);
  const [previews, setPreviews] = useState<LayoutPreview[]>([]);
  const [keyboards, setKeyboards] = useState<KeyboardType[]>([]);
  const [corpora, setCorpora] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<MetricWithRelations[]>([]);
  const [previewKeyboard, setPreviewKeyboard] = useState<string>('');
  const [metricsKeyboard, setMetricsKeyboard] = useState<string>('');
  const [selectedCorpus, setSelectedCorpus] = useState<string>('');
  const [currentMetric, setCurrentMetric] = useState<MetricWithRelations | null>(null);
  const [previewType, setPreviewType] = useState<'layout' | 'heatmap'>('layout');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        if (keyboardsData.length > 0) {
          setPreviewKeyboard(keyboardsData[0].id.toString());
          setMetricsKeyboard(keyboardsData[0].id.toString());
        }
        if (corporaData.length > 0) {
          const filtered = corporaData.filter(c => c.language === layoutData.language);
          setSelectedCorpus(filtered[0]?.id.toString() || corporaData[0].id.toString());
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

  useEffect(() => {
    if (metricsKeyboard && selectedCorpus && metrics.length > 0) {
      const metric = metrics.find(m =>
        m.layout === parseInt(layoutId) &&
        m.keyboard === parseInt(metricsKeyboard) &&
        m.corpus === parseInt(selectedCorpus)
      );
      setCurrentMetric(metric || null);
    }
  }, [metricsKeyboard, selectedCorpus, metrics, layoutId]);

  // Получаем превью для выбранной клавиатуры
  const selectedPreview = previews.find(
    preview => preview.layout === parseInt(layoutId) &&
      preview.keyboard === parseInt(previewKeyboard)
  );
  const heatmapUrl = currentMetric?.frequency_heatmap;
  const filteredCorpora = corpora.filter(corpus => corpus.language === layout?.language);

  if (loading) {
    return <div className="container py-8"></div>;
  }

  if (error || !layout) {
    return (
      <div className="container py-8">
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
    <div className="container py-8">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <H1>Раскладка {layout.name}</H1>

        {/* Preview and Properties Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Left: Preview Card (2/3) */}
          <div className="xl:col-span-2">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Превью</CardTitle>
                <div className="flex gap-3">
                  <Button
                    variant={previewType === 'layout' ? 'default' : 'outline'}
                    size="icon-sm"
                    onClick={() => setPreviewType('layout')}
                  >
                    <Layers2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={previewType === 'heatmap' ? 'default' : 'outline'}
                    size="icon-sm"
                    onClick={() => setPreviewType('heatmap')}
                    disabled={!heatmapUrl}
                  >
                    <Flame className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative w-full overflow-hidden rounded-md aspect-23/9">
                  {previewType === 'layout' && selectedPreview ? (
                    <Image
                      src={selectedPreview.layout_preview}
                      alt={`Превью раскладки ${layout.name}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  ) : previewType === 'heatmap' && heatmapUrl ? (
                    <Image
                      src={heatmapUrl}
                      alt={`Тепловая карта ${layout.name}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                      <div className="text-center text-muted-foreground">
                        <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">
                          {previewType === 'layout'
                            ? 'Превью недоступно для выбранной клавиатуры'
                            : 'Тепловая карта недоступна'
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Properties Card (1/3) */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Свойства</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">

                {/* Preview settings */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Клавиатура для аналитики</Label>
                    <Select
                      value={previewKeyboard}
                      onValueChange={(value) => {
                        setPreviewKeyboard(value);
                        setMetricsKeyboard(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите клавиатуру" />
                      </SelectTrigger>
                      <SelectContent>
                        {keyboards.map((keyboard) => (
                          <SelectItem key={keyboard.id} value={keyboard.id.toString()}>
                            {keyboard.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Корпус для аналитики</Label>
                    <Select
                      value={selectedCorpus}
                      onValueChange={setSelectedCorpus}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите корпус" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredCorpora.map((corpus) => (
                          <SelectItem key={corpus.id} value={corpus.id.toString()}>
                            {corpus.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Model file */}
                  <div className="pt-4 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 shrink-0" />
                        <span className="font-medium">Файл модели</span>
                      </div>
                      <div className="text-muted-foreground ml-7">
                        {layout.layout_model?.split('/').pop()}
                      </div>
                    </div>
                    <div className="flex items-center justify-center pl-3 self-stretch">
                      <DownloadButton
                        href={layout.layout_model}
                        aria-label={`Download ${layout.name} model`}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description */}
        {layout.description && (
          <section className="prose prose-gray max-w-none mt-6">
            <h2 className="text-lg font-semibold mb-4">Описание</h2>
            <p className="leading-relaxed whitespace-pre-wrap">
              {layout.description}
            </p>
          </section>
        )}

        {/* Metrics Section */}
        <h2 className="text-lg font-semibold mb-4">Метрики</h2>
        {/* Metrics charts */}
        {currentMetric ? (
          <LayoutMetrics metric={currentMetric} />
        ) : (
          <Card>
            <CardContent className="py-8">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Метрики не найдены</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
