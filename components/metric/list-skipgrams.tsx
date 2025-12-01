'use client';

import { MetricWithRelations } from '@/api';
import { formatPercentage } from '@/lib/utils';
import { Fingerprint, MoveHorizontal, Scissors } from 'lucide-react';
import { MetricCard } from './metric-card';

interface SkipgramsProps {
  metric: MetricWithRelations;
  getMetricRange: (metricField: string) => { min: number; max: number };
  referenceMetric?: MetricWithRelations | null;
  diffMode?: boolean;
  singleColumn?: boolean;
}
export function ListSkipgrams({ metric, getMetricRange, referenceMetric = null, diffMode = false, singleColumn = false }: SkipgramsProps) {
  const colClass = 'grid-cols-1';

  return (
    <div className="space-y-4">
      <div className="text-sm font-semibold text-muted-foreground mb-2">Скипграммы</div>
      <div className={`grid ${colClass} gap-4`}>
      <MetricCard
        title="Однопальцевые скипграммы"
        description="Один палец для тройки символов"
        value={formatPercentage(metric.same_finger_skipgram_frequency)}
        icon={Fingerprint}
        min={getMetricRange('same_finger_skipgram_frequency').min}
        max={getMetricRange('same_finger_skipgram_frequency').max}
        current={metric.same_finger_skipgram_frequency}
        diffMode={diffMode}
        referenceValue={referenceMetric ? referenceMetric.same_finger_skipgram_frequency : undefined}
      />

      <MetricCard
        title="Полные ножницы скипграмм"
        description="Разные руки, разные пальцы"
        value={formatPercentage(metric.full_scissor_skipgram_frequency)}
        icon={Scissors}
        min={getMetricRange('full_scissor_skipgram_frequency').min}
        max={getMetricRange('full_scissor_skipgram_frequency').max}
        current={metric.full_scissor_skipgram_frequency}
        diffMode={diffMode}
        referenceValue={referenceMetric ? referenceMetric.full_scissor_skipgram_frequency : undefined}
      />

      <MetricCard
        title="Полу-ножницы скипграмм"
        description="Одна рука, разные пальцы"
        value={formatPercentage(metric.half_scissor_skipgram_frequency)}
        icon={Scissors}
        min={getMetricRange('half_scissor_skipgram_frequency').min}
        max={getMetricRange('half_scissor_skipgram_frequency').max}
        current={metric.half_scissor_skipgram_frequency}
        diffMode={diffMode}
        referenceValue={referenceMetric ? referenceMetric.half_scissor_skipgram_frequency : undefined}
      />

      <MetricCard
        title="Боковое растяжение скипграмм"
        description="Горизонтальное растяжение"
        value={formatPercentage(metric.lateral_stretch_skipgram_frequency)}
        icon={MoveHorizontal}
        min={getMetricRange('lateral_stretch_skipgram_frequency').min}
        max={getMetricRange('lateral_stretch_skipgram_frequency').max}
        current={metric.lateral_stretch_skipgram_frequency}
        diffMode={diffMode}
        referenceValue={referenceMetric ? referenceMetric.lateral_stretch_skipgram_frequency : undefined}
      />
      </div>
    </div>
  );
}
