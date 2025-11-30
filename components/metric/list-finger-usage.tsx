'use client';

import { MetricWithRelations } from '@/api';
import { formatPercentage } from '@/lib/utils';
import { Hand, Pointer } from 'lucide-react';
import { MetricCard } from './metric-card';

interface FingerUsageMetricsProps {
  metric: MetricWithRelations;
  getMetricRange: (metricField: string) => { min: number; max: number };
}

export function ListFingerUsage({ metric, getMetricRange }: FingerUsageMetricsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Левая рука */}
      <div className="space-y-2">
        <div className="text-sm font-semibold text-muted-foreground mb-2">Левая рука</div>
        <MetricCard
          title="Мизинец"
          description="Процент использования левого мизинца"
          value={formatPercentage(metric.finger_usage_1)}
          icon={Hand}
          min={getMetricRange('finger_usage_1').min}
          max={getMetricRange('finger_usage_1').max}
          current={metric.finger_usage_1}
        />

        <MetricCard
          title="Безымянный"
          description="Процент использования левого безымянного пальца"
          value={formatPercentage(metric.finger_usage_2)}
          icon={Hand}
          min={getMetricRange('finger_usage_2').min}
          max={getMetricRange('finger_usage_2').max}
          current={metric.finger_usage_2}
        />

        <MetricCard
          title="Средний"
          description="Процент использования левого среднего пальца"
          value={formatPercentage(metric.finger_usage_3)}
          icon={Hand}
          min={getMetricRange('finger_usage_3').min}
          max={getMetricRange('finger_usage_3').max}
          current={metric.finger_usage_3}
        />

        <MetricCard
          title="Указательный"
          description="Процент использования левого указательного пальца"
          value={formatPercentage(metric.finger_usage_4)}
          icon={Pointer}
          min={getMetricRange('finger_usage_4').min}
          max={getMetricRange('finger_usage_4').max}
          current={metric.finger_usage_4}
        />

        {metric.finger_usage_5 !== 0 || metric.finger_usage_5 !== metric.finger_usage_6 && (
          <MetricCard
            title="Большой"
            description="Процент использования левого большого пальца"
            value={formatPercentage(metric.finger_usage_5)}
            icon={Hand}
            min={getMetricRange('finger_usage_5').min}
            max={getMetricRange('finger_usage_5').max}
            current={metric.finger_usage_5}
          />
        )}
      </div>

      {/* Right hand */}
      <div className="space-y-2">
        <div className="text-sm font-semibold text-muted-foreground mb-2">Правая рука</div>
        <MetricCard
          title="Мизинец"
          description="Процент использования правого мизинца"
          value={formatPercentage(metric.finger_usage_10)}
          icon={Hand}
          min={getMetricRange('finger_usage_10').min}
          max={getMetricRange('finger_usage_10').max}
          current={metric.finger_usage_10}
        />

        <MetricCard
          title="Безымянный"
          description="Процент использования правого безымянного пальца"
          value={formatPercentage(metric.finger_usage_9)}
          icon={Hand}
          min={getMetricRange('finger_usage_9').min}
          max={getMetricRange('finger_usage_9').max}
          current={metric.finger_usage_9}
        />


        <MetricCard
          title="Средний"
          description="Процент использования правого среднего пальца"
          value={formatPercentage(metric.finger_usage_8)}
          icon={Hand}
          min={getMetricRange('finger_usage_8').min}
          max={getMetricRange('finger_usage_8').max}
          current={metric.finger_usage_8}
        />

        <MetricCard
          title="Указательный"
          description="Процент использования правого указательного пальца"
          value={formatPercentage(metric.finger_usage_7)}
          icon={Pointer}
          min={getMetricRange('finger_usage_7').min}
          max={getMetricRange('finger_usage_7').max}
          current={metric.finger_usage_7}
        />

        {metric.finger_usage_6 !== 0 || metric.finger_usage_5 !== metric.finger_usage_6 && (
          <MetricCard
            title="Большой"
            description="Процент использования правого большого пальца"
            value={formatPercentage(metric.finger_usage_6)}
            icon={Hand}
            min={getMetricRange('finger_usage_6').min}
            max={getMetricRange('finger_usage_6').max}
            current={metric.finger_usage_6}
          />
        )}
      </div>
    </div>
  );
}
