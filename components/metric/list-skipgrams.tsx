'use client';

import { MetricWithRelations } from '@/api';
import { formatPercentage } from '@/lib/utils';
import { Fingerprint, MoveHorizontal, Scissors } from 'lucide-react';
import { MetricCard } from './metric-card';

interface SkipgramsProps {
  metric: MetricWithRelations;
  getMetricRange: (metricField: string) => { min: number; max: number };
}

export function ListSkipgrams({ metric, getMetricRange }: SkipgramsProps) {
  return (
    <div className="space-y-4">
      <div className="text-sm font-semibold text-muted-foreground mb-2">Скипграммы</div>

      <MetricCard
        title="Однопальцевые триграммы"
        description="Один палец для тройки символов"
        value={formatPercentage(metric.same_finger_skipgram_frequency)}
        icon={Fingerprint}
        min={getMetricRange('same_finger_skipgram_frequency').min}
        max={getMetricRange('same_finger_skipgram_frequency').max}
        current={metric.same_finger_skipgram_frequency}
      />

      <MetricCard
        title="Триграммные полные ножницы"
        description="Разные руки, разные пальцы"
        value={formatPercentage(metric.full_scissor_skipgram_frequency)}
        icon={Scissors}
        min={getMetricRange('full_scissor_skipgram_frequency').min}
        max={getMetricRange('full_scissor_skipgram_frequency').max}
        current={metric.full_scissor_skipgram_frequency}
      />

      <MetricCard
        title="Триграммные полу-ножницы"
        description="Одна рука, разные пальцы"
        value={formatPercentage(metric.half_scissor_skipgram_frequency)}
        icon={Scissors}
        min={getMetricRange('half_scissor_skipgram_frequency').min}
        max={getMetricRange('half_scissor_skipgram_frequency').max}
        current={metric.half_scissor_skipgram_frequency}
      />

      <MetricCard
        title="Триграммное боковое растяжение"
        description="Горизонтальное растяжение"
        value={formatPercentage(metric.lateral_stretch_skipgram_frequency)}
        icon={MoveHorizontal}
        min={getMetricRange('lateral_stretch_skipgram_frequency').min}
        max={getMetricRange('lateral_stretch_skipgram_frequency').max}
        current={metric.lateral_stretch_skipgram_frequency}
      />
    </div>
  );
}
