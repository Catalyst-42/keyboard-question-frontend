'use client';

import { MetricWithRelations } from '@/api';
import { formatUnits } from '@/lib/utils';
import { Hand, Move, Pointer } from 'lucide-react';
import { MetricCard } from './metric-card';

interface DistanceMetricsProps {
  metric: MetricWithRelations;
  getMetricRange: (metricField: string) => { min: number; max: number };
}

export function ListFingerDistance({ metric, getMetricRange }: DistanceMetricsProps) {
  return (
    <div className="space-y-6">
      {/* Total */}
      <div className="grid grid-cols-1 gap-4">
        <MetricCard
          title="Общая дистанция"
          description="Общее расстояние перемещения пальцев"
          value={formatUnits(metric.travel_distance)}
          icon={Move}
          min={getMetricRange('travel_distance').min}
          max={getMetricRange('travel_distance').max}
          current={metric.travel_distance}
        />
      </div>

      {/* Travel distance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left hand */}
        <div className="space-y-4">
          <div className="text-sm font-semibold text-muted-foreground mb-2">Левая рука</div>
          <div className="space-y-2">
            <MetricCard
              title="Мизинец"
              description="Расстояние для левого мизинца"
              value={formatUnits(metric.travel_distance_finger_1)}
              icon={Hand}
              min={getMetricRange('travel_distance_finger_1').min}
              max={getMetricRange('travel_distance_finger_1').max}
              current={metric.travel_distance_finger_1}
            />

            <MetricCard
              title="Безымянный"
              description="Расстояние для левого безымянного пальца"
              value={formatUnits(metric.travel_distance_finger_2)}
              icon={Hand}
              min={getMetricRange('travel_distance_finger_2').min}
              max={getMetricRange('travel_distance_finger_2').max}
              current={metric.travel_distance_finger_2}
            />

            <MetricCard
              title="Средний"
              description="Расстояние для левого среднего пальца"
              value={formatUnits(metric.travel_distance_finger_3)}
              icon={Hand}
              min={getMetricRange('travel_distance_finger_3').min}
              max={getMetricRange('travel_distance_finger_3').max}
              current={metric.travel_distance_finger_3}
            />

            <MetricCard
              title="Указательный"
              description="Расстояние для левого указательного пальца"
              value={formatUnits(metric.travel_distance_finger_4)}
              icon={Hand}
              min={getMetricRange('travel_distance_finger_4').min}
              max={getMetricRange('travel_distance_finger_4').max}
              current={metric.travel_distance_finger_4}
            />

            {metric.travel_distance_finger_5 !== 0 || metric.travel_distance_finger_5 !== metric.travel_distance_finger_6 && (
              <MetricCard
                title="Большой"
                description="Расстояние для левого большого пальца"
                value={formatUnits(metric.travel_distance_finger_5)}
                icon={Hand}
                min={getMetricRange('travel_distance_finger_5').min}
                max={getMetricRange('travel_distance_finger_5').max}
                current={metric.travel_distance_finger_5}
              />
            )}
          </div>
        </div>

        {/* Right hand */}
        <div className="space-y-4">
          <div className="text-sm font-semibold text-muted-foreground mb-2">Левая рука</div>
          <div className="space-y-2">
            <MetricCard
              title="Мизинец"
              description="Расстояние для правого мизинца"
              value={formatUnits(metric.travel_distance_finger_10)}
              icon={Hand}
              min={getMetricRange('travel_distance_finger_10').min}
              max={getMetricRange('travel_distance_finger_10').max}
              current={metric.travel_distance_finger_10}
            />

            <MetricCard
              title="Безымянный"
              description="Расстояние для правого безымянного пальца"
              value={formatUnits(metric.travel_distance_finger_9)}
              icon={Hand}
              min={getMetricRange('travel_distance_finger_9').min}
              max={getMetricRange('travel_distance_finger_9').max}
              current={metric.travel_distance_finger_9}
            />

            <MetricCard
              title="Средний"
              description="Расстояние для правого среднего пальца"
              value={formatUnits(metric.travel_distance_finger_8)}
              icon={Pointer}
              min={getMetricRange('travel_distance_finger_8').min}
              max={getMetricRange('travel_distance_finger_8').max}
              current={metric.travel_distance_finger_8}
            />

            <MetricCard
              title="Указательный"
              description="Расстояние для правого указательного пальца"
              value={formatUnits(metric.travel_distance_finger_7)}
              icon={Pointer}
              min={getMetricRange('travel_distance_finger_7').min}
              max={getMetricRange('travel_distance_finger_7').max}
              current={metric.travel_distance_finger_7}
            />

            {metric.travel_distance_finger_6 !== 0 || metric.travel_distance_finger_5 !== metric.travel_distance_finger_6 && (
              <MetricCard
                title="Большой"
                description="Расстояние для правого большого пальца"
                value={formatUnits(metric.travel_distance_finger_6)}
                icon={Hand}
                min={getMetricRange('travel_distance_finger_6').min}
                max={getMetricRange('travel_distance_finger_6').max}
                current={metric.travel_distance_finger_6}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
