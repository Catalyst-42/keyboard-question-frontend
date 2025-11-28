'use client';

import { MetricWithRelations } from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { ArrowLeftRight, ArrowRightLeft, Divide, Fingerprint, Hand, Info, Move, MoveHorizontal, Pointer, RotateCcw, Rows3, Scissors } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

import { useExtremesData } from '@/hooks/use-extemes-data';
import { MetricCard } from './metric-card';

interface LayoutMetricsProps {
  metric: MetricWithRelations;
}

export function LayoutMetrics({ metric }: LayoutMetricsProps) {
  const { data: extremes, loading, error } = useExtremesData();

  // Formatting functions with two decimal places
  const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const formatDistance = (value: number): string => {
    return value.toFixed(2);
  };

  // Helper function to get min/max values for a metric
  const getMetricRange = (metricField: string) => {
    if (!extremes || !extremes[metricField]) {
      console.log(`Can't find metric range for ${metricField}`);
      return { min: 0, max: 100 };
    }

    const extreme = extremes[metricField];
    return {
      min: extreme.min_value !== null ? extreme.min_value * 100 : 0,
      max: extreme.max_value !== null ? extreme.max_value * 100 : 8
    };
  };

  // Chart configurations
  const fingerUsageConfig = {
    usage: {
      label: "Использование",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const fingerDistanceConfig = {
    distance: {
      label: "Дистанция",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const rowUsageConfig = {
    usage: {
      label: "Использование",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  // Finger usage data (1-10)
  const fingerUsageData = [
    { finger: '1', usage: metric.finger_usage_1 * 100, hand: 'left' },
    { finger: '2', usage: metric.finger_usage_2 * 100, hand: 'left' },
    { finger: '3', usage: metric.finger_usage_3 * 100, hand: 'left' },
    { finger: '4', usage: metric.finger_usage_4 * 100, hand: 'left' },
    { finger: '5', usage: metric.finger_usage_5 * 100, hand: 'left' },
    { finger: '6', usage: metric.finger_usage_6 * 100, hand: 'right' },
    { finger: '7', usage: metric.finger_usage_7 * 100, hand: 'right' },
    { finger: '8', usage: metric.finger_usage_8 * 100, hand: 'right' },
    { finger: '9', usage: metric.finger_usage_9 * 100, hand: 'right' },
    { finger: '10', usage: metric.finger_usage_10 * 100, hand: 'right' },
  ];

  // Finger distance data (1-10)
  const fingerDistanceData = [
    { finger: '1', distance: metric.travel_distance_finger_1, hand: 'left' },
    { finger: '2', distance: metric.travel_distance_finger_2, hand: 'left' },
    { finger: '3', distance: metric.travel_distance_finger_3, hand: 'left' },
    { finger: '4', distance: metric.travel_distance_finger_4, hand: 'left' },
    { finger: '5', distance: metric.travel_distance_finger_5, hand: 'left' },
    { finger: '6', distance: metric.travel_distance_finger_6, hand: 'right' },
    { finger: '7', distance: metric.travel_distance_finger_7, hand: 'right' },
    { finger: '8', distance: metric.travel_distance_finger_8, hand: 'right' },
    { finger: '9', distance: metric.travel_distance_finger_9, hand: 'right' },
    { finger: '10', distance: metric.travel_distance_finger_10, hand: 'right' },
  ];

  // Row usage data (transposed) with full labels
  const rowUsageData = [
    { row: 'K', usage: metric.row_usage_k * 100 },
    { row: 'E', usage: metric.row_usage_e * 100 },
    { row: 'D', usage: metric.row_usage_d * 100 },
    { row: 'C', usage: metric.row_usage_c * 100 },
    { row: 'B', usage: metric.row_usage_b * 100 },
    { row: 'A', usage: metric.row_usage_a * 100 },
  ];

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

  // Total travel distance
  const totalTravelDistance = metric.travel_distance;

  // Custom tooltip for fingers
  const FingerTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold">Палец {label}</p>
          <p className="text-sm">
            {payload[0].dataKey === 'usage' ? 'Использование' : 'Дистанция'}: {Number(payload[0].value).toFixed(2)}
            {payload[0].dataKey === 'usage' ? '%' : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for rows
  const RowTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      // Create full row names for tooltip
      const rowNames: { [key: string]: string } = {
        'K': 'Функциональный ряд',
        'E': 'Ряд цифр',
        'D': 'Верхний ряд',
        'C': 'Домашний ряд',
        'B': 'Нижний ряд',
        'A': 'Контрольный ряд'
      };

      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold">{rowNames[label] || label}</p>
          <p className="text-sm">
            Использование: {Number(payload[0].value).toFixed(2)}%
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return <div>Загрузка данных...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className="space-y-4">
      {/* First level - two cards (fingers) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Finger usage chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Pointer className="h-4 w-4" />
              Использование пальцев
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ChartContainer config={fingerUsageConfig} className="h-40 w-full">
              <BarChart data={fingerUsageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="finger"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip isAnimationActive={false} content={<FingerTooltip />} />
                <Bar
                  dataKey="usage"
                  fill="var(--color-usage)"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ChartContainer>

            {/* Hand balance - split into two halves */}
            <div className="flex border rounded-lg overflow-hidden bg-muted/30">
              <div
                className="flex-1 py-2 text-center relative"
                style={{ flex: leftHandUsagePercent }}
              >
                <div className="text-sm font-medium">
                  {leftHandUsagePercent.toFixed(2)}%
                </div>
                <div className="text-xs text-muted-foreground">Левая</div>
              </div>
              <div
                className="flex-1 py-2 text-center relative"
                style={{ flex: rightHandUsagePercent }}
              >
                <div className="text-sm font-medium">
                  {rightHandUsagePercent.toFixed(2)}%
                </div>
                <div className="text-xs text-muted-foreground">Правая</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Finger distance chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Move className="h-4 w-4" />
              Дистанция пальцев
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ChartContainer config={fingerDistanceConfig} className="h-40 w-full">
              <BarChart data={fingerDistanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="finger"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip isAnimationActive={false} content={<FingerTooltip />} />
                <Bar
                  dataKey="distance"
                  fill="var(--color-distance)"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ChartContainer>

            {/* Total distance in center */}
            <div className="border rounded-lg bg-muted/30 py-2 text-center">
              <div className="text-sm font-medium">
                {formatDistance(totalTravelDistance)}u
              </div>
              <div className="text-xs text-muted-foreground">Среднее перемещение</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second level - two cards (rows and trigrams) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Row usage chart (transposed) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Rows3 className="h-4 w-4" />
              Использование рядов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={rowUsageConfig} className="h-50 w-full">
              <BarChart
                data={rowUsageData}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  hide={true}
                />
                <YAxis
                  type="category"
                  dataKey="row"
                  axisLine={false}
                  tickLine={false}
                  width={16}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip isAnimationActive={false} content={<RowTooltip />} />
                <Bar
                  dataKey="usage"
                  fill="var(--color-usage)"
                  radius={[0, 2, 2, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Info className="h-4 w-4" />
              Характер использования раскладки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Rolls / Alternation ratio */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Divide className="h-4 w-4" />
                  <div>
                    <div className="text-sm font-medium">Роллинг / Чередование</div>
                    <div className="text-xs text-muted-foreground">Отношение стилей набора</div>
                  </div>
                </div>
                <div className="text-sm font-mono font-semibold">
                  {metric.alternate_frequency > 0
                    ? (metric.roll_frequency / metric.alternate_frequency).toFixed(2)
                    : 'N/A'
                  }
                </div>
              </div>

              {/* Description with header */}
              <div>
                <div className="text-sm font-medium mb-3">Вывод</div>
                <div className="text-sm text-muted-foreground">
                  {(() => {
                    const ratio = metric.alternate_frequency > 0 ? metric.roll_frequency / metric.alternate_frequency : 0;

                    if (ratio > 1.5) {
                      return "Раскладка с преобладанием роллинга. Частые последовательности одной рукой могут обеспечивать высокую скорость набора, но требуют хорошей координации движений пальцев и создают нагрузку на отдельные пальцы при длительной работе.";
                    } else if (ratio < 0.75) {
                      return "Раскладка с высокой долей чередования. Частая смена рук способствует равномерному распределению нагрузки между руками, снижает усталость и рекомендуется для профилактики повторяющихся стрессовых травм при длительном наборе.";
                    } else {
                      return "Сбалансированная раскладка. Оптимальное сочетание роллинга и чередования обеспечивает комфортный и эффективный набор, подходящий для различных стилей печати и способствующий как скорости, так и эргономике работы.";
                    }
                  })()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bigram and trigram metrics table */}
      <div className="space-y-6">

        {/* Bigram metrics */}
        <div>
          <h3 className="text-lg font-semibold">Парные метрики</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bigrams */}
            <div className="space-y-4">
              <div className="text-sm font-semibold text-muted-foreground mb-2">Биграммы</div>

              <MetricCard
                title="Однопальцевые биграммы"
                description="Один палец для пары символов"
                value={formatPercentage(metric.same_finger_bigram_frequency)}
                icon={Fingerprint}
                min={getMetricRange('same_finger_bigram_frequency').min}
                max={getMetricRange('same_finger_bigram_frequency').max}
                current={metric.same_finger_bigram_frequency * 100}
              />

              <MetricCard
                title="Биграммные ножницы"
                description="Расстояние между парой больше 2u"
                value={formatPercentage(metric.full_scissor_bigram_frequency)}
                icon={Scissors}
                min={getMetricRange('full_scissor_bigram_frequency').min}
                max={getMetricRange('full_scissor_bigram_frequency').max}
                current={metric.full_scissor_bigram_frequency * 100}
              />

              <MetricCard
                title="Биграммные полу-ножницы"
                description="Расстояние между парой больше 1u"
                value={formatPercentage(metric.half_scissor_bigram_frequency)}
                icon={Scissors}
                min={getMetricRange('half_scissor_bigram_frequency').min}
                max={getMetricRange('half_scissor_bigram_frequency').max}
                current={metric.half_scissor_bigram_frequency * 100}
              />

              <MetricCard
                title="Биграммное боковое растяжение"
                description="Горизонтальное растяжение"
                value={formatPercentage(metric.lateral_stretch_bigram_frequency)}
                icon={MoveHorizontal}
                min={getMetricRange('lateral_stretch_bigram_frequency').min}
                max={getMetricRange('lateral_stretch_bigram_frequency').max}
                current={metric.lateral_stretch_bigram_frequency * 100}
              />
            </div>

            {/* Skipgrams */}
            <div className="space-y-4">
              <div className="text-sm font-semibold text-muted-foreground mb-2">Скипграммы</div>

              <MetricCard
                title="Однопальцевые триграммы"
                description="Один палец для тройки символов"
                value={formatPercentage(metric.same_finger_skipgram_frequency)}
                icon={Fingerprint}
                min={getMetricRange('same_finger_skipgram_frequency').min}
                max={getMetricRange('same_finger_skipgram_frequency').max}
                current={metric.same_finger_skipgram_frequency * 100}
              />

              <MetricCard
                title="Триграммные полные ножницы"
                description="Разные руки, разные пальцы"
                value={formatPercentage(metric.full_scissor_skipgram_frequency)}
                icon={Scissors}
                min={getMetricRange('full_scissor_skipgram_frequency').min}
                max={getMetricRange('full_scissor_skipgram_frequency').max}
                current={metric.full_scissor_skipgram_frequency * 100}
              />

              <MetricCard
                title="Триграммные полу-ножницы"
                description="Одна рука, разные пальцы"
                value={formatPercentage(metric.half_scissor_skipgram_frequency)}
                icon={Scissors}
                min={getMetricRange('half_scissor_skipgram_frequency').min}
                max={getMetricRange('half_scissor_skipgram_frequency').max}
                current={metric.half_scissor_skipgram_frequency * 100}
              />

              <MetricCard
                title="Триграммное боковое растяжение"
                description="Горизонтальное растяжение"
                value={formatPercentage(metric.lateral_stretch_skipgram_frequency)}
                icon={MoveHorizontal}
                min={getMetricRange('lateral_stretch_skipgram_frequency').min}
                max={getMetricRange('lateral_stretch_skipgram_frequency').max}
                current={metric.lateral_stretch_skipgram_frequency * 100}
              />
            </div>
          </div>
        </div>

        {/* Trigram metrics */}
        <div>
          <h3 className="text-lg font-semibold">Триграммные метрики</h3>
          <div className="text-sm font-semibold text-muted-foreground mb-2">Комплексный анализ</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetricCard
              title="Роллинг"
              description="Ролл на два символа из тройки"
              value={formatPercentage(metric.roll_frequency)}
              icon={RotateCcw}
              min={getMetricRange('roll_frequency').min}
              max={getMetricRange('roll_frequency').max}
              current={metric.roll_frequency * 100}
            />

            <MetricCard
              title="Чередование"
              description="Смена рук при наборе"
              value={formatPercentage(metric.alternate_frequency)}
              icon={ArrowLeftRight}
              min={getMetricRange('alternate_frequency').min}
              max={getMetricRange('alternate_frequency').max}
              current={metric.alternate_frequency * 100}
            />

            <MetricCard
              title="Полный роллинг"
              description="Полный ролл на три символа"
              value={formatPercentage(metric.onehand_frequency)}
              icon={Hand}
              min={getMetricRange('onehand_frequency').min}
              max={getMetricRange('onehand_frequency').max}
              current={metric.onehand_frequency * 100}
            />

            <MetricCard
              title="Редиректы"
              description="Изменения направления печати"
              value={formatPercentage(metric.redirect_frequency)}
              icon={ArrowRightLeft}
              min={getMetricRange('redirect_frequency').min}
              max={getMetricRange('redirect_frequency').max}
              current={metric.redirect_frequency * 100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Add ChartConfig type for TypeScript
type ChartConfig = {
  [k in string]: {
    label?: string;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<'light' | 'dark', string> }
  );
};