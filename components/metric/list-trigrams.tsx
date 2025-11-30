'use client';

import { MetricWithRelations } from '@/api';
import { formatPercentage } from '@/lib/utils';
import { ArrowLeftRight, ArrowRightLeft, Hand, RotateCcw } from 'lucide-react';
import { MetricCard } from './metric-card';

interface TrigramsProps {
  metric: MetricWithRelations;
  getMetricRange: (metricField: string) => { min: number; max: number };
}

export function ListTrigrams({ metric, getMetricRange }: TrigramsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <MetricCard
        title="Роллинг"
        description="Ролл на два символа из тройки"
        value={formatPercentage(metric.roll_frequency)}
        icon={RotateCcw}
        min={getMetricRange('roll_frequency').min}
        max={getMetricRange('roll_frequency').max}
        current={metric.roll_frequency}
      />

      <MetricCard
        title="Чередование"
        description="Смена рук при наборе"
        value={formatPercentage(metric.alternate_frequency)}
        icon={ArrowLeftRight}
        min={getMetricRange('alternate_frequency').min}
        max={getMetricRange('alternate_frequency').max}
        current={metric.alternate_frequency}
      />

      <MetricCard
        title="Полный роллинг"
        description="Полный ролл на три символа"
        value={formatPercentage(metric.onehand_frequency)}
        icon={Hand}
        min={getMetricRange('onehand_frequency').min}
        max={getMetricRange('onehand_frequency').max}
        current={metric.onehand_frequency}
      />

      <MetricCard
        title="Редиректы"
        description="Изменения направления печати"
        value={formatPercentage(metric.redirect_frequency)}
        icon={ArrowRightLeft}
        min={getMetricRange('redirect_frequency').min}
        max={getMetricRange('redirect_frequency').max}
        current={metric.redirect_frequency}
      />
    </div>
  );
}
