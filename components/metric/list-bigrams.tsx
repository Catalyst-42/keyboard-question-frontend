'use client';

import { MetricWithRelations } from '@/api';
import { formatPercentage } from '@/lib/utils';
import { Fingerprint, MoveHorizontal, Scissors } from 'lucide-react';
import { MetricCard } from './metric-card';

interface BigramsProps {
  metric: MetricWithRelations;
  getMetricRange: (metricField: string) => { min: number; max: number };
  referenceMetric?: MetricWithRelations | null;
  diffMode?: boolean;
  singleColumn?: boolean;
}

export function ListBigrams({ metric, getMetricRange, referenceMetric = null, diffMode = false }: BigramsProps) {
  const colClass = 'grid-cols-1';

  return (
    <div className="space-y-4">
      <div className="text-sm font-semibold text-muted-foreground mb-2">Биграммы</div>
      <div className={`grid ${colClass} gap-4`}>
        <MetricCard
        title="Однопальцевые биграммы"
        description="Один палец для пары символов"
        value={formatPercentage(metric.same_finger_bigram_frequency)}
        icon={Fingerprint}
        min={getMetricRange('same_finger_bigram_frequency').min}
        max={getMetricRange('same_finger_bigram_frequency').max}
        current={metric.same_finger_bigram_frequency}
        diffMode={diffMode}
        referenceValue={referenceMetric ? referenceMetric.same_finger_bigram_frequency : undefined}
      />

      <MetricCard
        title="Ножницы биграмм"
        description="Расстояние между парой больше 2u"
        value={formatPercentage(metric.full_scissor_bigram_frequency)}
        icon={Scissors}
        min={getMetricRange('full_scissor_bigram_frequency').min}
        max={getMetricRange('full_scissor_bigram_frequency').max}
        current={metric.full_scissor_bigram_frequency}
        diffMode={diffMode}
        referenceValue={referenceMetric ? referenceMetric.full_scissor_bigram_frequency : undefined}
      />

      <MetricCard
        title="Полу-ножницы биграмм"
        description="Расстояние между парой больше 1u"
        value={formatPercentage(metric.half_scissor_bigram_frequency)}
        icon={Scissors}
        min={getMetricRange('half_scissor_bigram_frequency').min}
        max={getMetricRange('half_scissor_bigram_frequency').max}
        current={metric.half_scissor_bigram_frequency}
        diffMode={diffMode}
        referenceValue={referenceMetric ? referenceMetric.half_scissor_bigram_frequency : undefined}
      />

      <MetricCard
        title="Боковое растяжение биграмм"
        description="Горизонтальное растяжение"
        value={formatPercentage(metric.lateral_stretch_bigram_frequency)}
        icon={MoveHorizontal}
        min={getMetricRange('lateral_stretch_bigram_frequency').min}
        max={getMetricRange('lateral_stretch_bigram_frequency').max}
        current={metric.lateral_stretch_bigram_frequency}
        diffMode={diffMode}
        referenceValue={referenceMetric ? referenceMetric.lateral_stretch_bigram_frequency : undefined}
      />
      </div>
    </div>
  );
}
