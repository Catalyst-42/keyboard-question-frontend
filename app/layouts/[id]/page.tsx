'use client';
import {
  Keyboard as KeyboardType,
  Layout,
  LayoutPreview,
  MetricWithRelations
} from '@/api';
import {
  Alert,
  AlertDescription
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { H1 } from '@/components/ui/h1';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  AlertCircle,
  BarChart3,
  FileText,
  Flame,
  ImageIcon,
  Layers2
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { InputStyle } from '@/components/metric/card-input-style';
import { ListBigrams } from '@/components/metric/list-bigrams';
import { ListFingerDistance } from '@/components/metric/list-finger-distance';
import { ListFingerUsage } from '@/components/metric/list-finger-usage';
import { ListSkipgrams } from '@/components/metric/list-skipgrams';
import { ListTrigrams } from '@/components/metric/list-trigrams';
import { PlotFingerDistance } from '@/components/metric/plot-finger-distance';
import { PlotFingerUsage } from '@/components/metric/plot-finger-usage';
import { PlotRowUsage } from '@/components/metric/plot-row-usage';
import DownloadButton from '@/components/ui/download-button';
import { useExtremesData } from '@/hooks/use-extemes-data';
import { corpusService } from '@/lib/corpus-service';
import { keyboardService } from '@/lib/keyboard-service';
import { layoutService } from '@/lib/layout-service';
import { metricService } from '@/lib/metric-service';
import Image from 'next/image';

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

  const { data: extremes, loading: extremesLoading, error: extremesError } = useExtremesData();

  // Helper function to get min/max values for a metric
  const getMetricRange = (metricField: string) => {
    if (!extremes || !extremes[metricField]) {
      console.log(`Can't find metric range for ${metricField}`);
      return { min: 0, max: 100 };
    }

    const extreme = extremes[metricField];
    return {
      min: extreme.min_value !== null ? extreme.min_value : 0,
      max: extreme.max_value !== null ? extreme.max_value : 100
    };
  };

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

  // Finger usage data (1-10)
  const fingerUsageData = currentMetric ? [
    { finger: '1', usage: currentMetric.finger_usage_1, hand: 'left' },
    { finger: '2', usage: currentMetric.finger_usage_2, hand: 'left' },
    { finger: '3', usage: currentMetric.finger_usage_3, hand: 'left' },
    { finger: '4', usage: currentMetric.finger_usage_4, hand: 'left' },
    { finger: '5', usage: currentMetric.finger_usage_5, hand: 'left' },
    { finger: '6', usage: currentMetric.finger_usage_6, hand: 'right' },
    { finger: '7', usage: currentMetric.finger_usage_7, hand: 'right' },
    { finger: '8', usage: currentMetric.finger_usage_8, hand: 'right' },
    { finger: '9', usage: currentMetric.finger_usage_9, hand: 'right' },
    { finger: '10', usage: currentMetric.finger_usage_10, hand: 'right' },
  ] : [];

  // Finger distance data (1-10)
  const fingerDistanceData = currentMetric ? [
    { finger: '1', distance: currentMetric.travel_distance_finger_1, hand: 'left' },
    { finger: '2', distance: currentMetric.travel_distance_finger_2, hand: 'left' },
    { finger: '3', distance: currentMetric.travel_distance_finger_3, hand: 'left' },
    { finger: '4', distance: currentMetric.travel_distance_finger_4, hand: 'left' },
    { finger: '5', distance: currentMetric.travel_distance_finger_5, hand: 'left' },
    { finger: '6', distance: currentMetric.travel_distance_finger_6, hand: 'right' },
    { finger: '7', distance: currentMetric.travel_distance_finger_7, hand: 'right' },
    { finger: '8', distance: currentMetric.travel_distance_finger_8, hand: 'right' },
    { finger: '9', distance: currentMetric.travel_distance_finger_9, hand: 'right' },
    { finger: '10', distance: currentMetric.travel_distance_finger_10, hand: 'right' },
  ] : [];

  // Row usage data (transposed) with full labels
  const rowUsageData = currentMetric ? [
    { row: 'K', usage: currentMetric.row_usage_k },
    { row: 'E', usage: currentMetric.row_usage_e },
    { row: 'D', usage: currentMetric.row_usage_d },
    { row: 'C', usage: currentMetric.row_usage_c },
    { row: 'B', usage: currentMetric.row_usage_b },
    { row: 'A', usage: currentMetric.row_usage_a },
  ] : [];

  // Hand balance calculation for usage
  const leftHandUsage = fingerUsageData
    .filter(item => item.hand === 'left')
    .reduce((sum, item) => sum + item.usage, 0);

  const rightHandUsage = fingerUsageData
    .filter(item => item.hand === 'right')
    .reduce((sum, item) => sum + item.usage, 0);

  const totalUsage = leftHandUsage + rightHandUsage;
  const leftHandUsagePercent = totalUsage > 0 ? (leftHandUsage / totalUsage) * 100 : 0;
  const rightHandUsagePercent = totalUsage > 0 ? (rightHandUsage / totalUsage) * 100 : 0;

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
                      sizes="(max-width: 2048px) 100vw, 66vw"
                    />
                  ) : previewType === 'heatmap' && heatmapUrl ? (
                    <Image
                      src={heatmapUrl}
                      alt={`Тепловая карта ${layout.name}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 2048px) 100vw, 66vw"
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
        {currentMetric ? (
          <div className="space-y-4">
            {/* First level - two cards (fingers) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <PlotFingerDistance
                fingerDistanceData={fingerDistanceData}
                totalTravelDistance={currentMetric.travel_distance}
              />

              <PlotFingerUsage
                fingerUsageData={fingerUsageData}
                leftHandUsagePercent={leftHandUsagePercent}
                rightHandUsagePercent={rightHandUsagePercent}
              />
            </div>

            {/* Finger distance */}
            <div>
              <h3 className="text-lg font-semibold">Метрики дистанции</h3>
              <div className="text-sm font-semibold text-muted-foreground mb-2">Общее</div>
              <ListFingerDistance metric={currentMetric} getMetricRange={getMetricRange} />
            </div>

            {/* Finger usage */}
            <div>
              <h3 className="text-lg font-semibold">Метрики использования</h3>
              <ListFingerUsage metric={currentMetric} getMetricRange={getMetricRange} />
            </div>

            {/* Second level - two cards (rows and trigrams) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <PlotRowUsage rowUsageData={rowUsageData} />
              <InputStyle metric={currentMetric} />
            </div>

            {/* Bigram and trigram metrics table */}
            <div className="space-y-6">
              {/* Bigram metrics */}
              <div>
                <h3 className="text-lg font-semibold">Парные метрики</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <ListBigrams metric={currentMetric} getMetricRange={getMetricRange} />
                  <ListSkipgrams metric={currentMetric} getMetricRange={getMetricRange} />
                </div>
              </div>

              {/* Trigram metrics */}
              <div>
                <h3 className="text-lg font-semibold">Триграммные метрики</h3>
                <div className="text-sm font-semibold text-muted-foreground mb-2">Комплексный анализ</div>
                <ListTrigrams metric={currentMetric} getMetricRange={getMetricRange} />
              </div>
            </div>
          </div>
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
