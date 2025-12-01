import { MetricWithRelations } from '@/api';
import { formatPercentage } from '@/lib/utils';
import { Keyboard } from 'lucide-react';
import { MetricCard } from './metric-card';

interface RowUsageProps {
  metric: MetricWithRelations;
  getMetricRange: (metricField: string) => { min: number; max: number };
  referenceMetric?: MetricWithRelations | null;
  diffMode?: boolean;
}
export function ListRowUsage({ metric, getMetricRange, referenceMetric = null, diffMode = false }: RowUsageProps) {
  return (
    <div className={`grid grid-cols-1 gap-4`}>
      <MetricCard
        title="Ряд K"
        description="Верхний ряд"
        value={formatPercentage(metric.row_usage_k)}
        icon={Keyboard}
        min={getMetricRange('row_usage_k').min}
        max={getMetricRange('row_usage_k').max}
        current={metric.row_usage_k}
        diffMode={diffMode}
        referenceValue={referenceMetric ? referenceMetric.row_usage_k : undefined}
      />

      <MetricCard
        title="Ряд E"
        description="Верхний средний ряд"
        value={formatPercentage(metric.row_usage_e)}
        icon={Keyboard}
        min={getMetricRange('row_usage_e').min}
        max={getMetricRange('row_usage_e').max}
        current={metric.row_usage_e}
        diffMode={diffMode}
        referenceValue={referenceMetric ? referenceMetric.row_usage_e : undefined}
      />

      <MetricCard
        title="Ряд D"
        description="Домашний ряд"
        value={formatPercentage(metric.row_usage_d)}
        icon={Keyboard}
        min={getMetricRange('row_usage_d').min}
        max={getMetricRange('row_usage_d').max}
        current={metric.row_usage_d}
        diffMode={diffMode}
        referenceValue={referenceMetric ? referenceMetric.row_usage_d : undefined}
      />

      <MetricCard
        title="Ряд C"
        description="Нижний средний ряд"
        value={formatPercentage(metric.row_usage_c)}
        icon={Keyboard}
        min={getMetricRange('row_usage_c').min}
        max={getMetricRange('row_usage_c').max}
        current={metric.row_usage_c}
        diffMode={diffMode}
        referenceValue={referenceMetric ? referenceMetric.row_usage_c : undefined}
      />

      <MetricCard
        title="Ряд B"
        description="Нижний ряд"
        value={formatPercentage(metric.row_usage_b)}
        icon={Keyboard}
        min={getMetricRange('row_usage_b').min}
        max={getMetricRange('row_usage_b').max}
        current={metric.row_usage_b}
        diffMode={diffMode}
        referenceValue={referenceMetric ? referenceMetric.row_usage_b : undefined}
      />

      <MetricCard
        title="Ряд A"
        description="Пробельный ряд"
        value={formatPercentage(metric.row_usage_a)}
        icon={Keyboard}
        min={getMetricRange('row_usage_a').min}
        max={getMetricRange('row_usage_a').max}
        current={metric.row_usage_a}
        diffMode={diffMode}
        referenceValue={referenceMetric ? referenceMetric.row_usage_a : undefined}
      />
    </div>
  );
}
