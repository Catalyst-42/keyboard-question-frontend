'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricWithRelations } from '@/api';
import { Move, Scissors, GitBranch, BarChart3 } from 'lucide-react';

interface MetricDetailsProps {
  metric: MetricWithRelations;
}

export function MetricDetails({ metric }: MetricDetailsProps) {
  const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Основные метрики */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Move className="h-4 w-4" />
            Дистанция
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metric.travel_distance.toFixed(1)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            SFB
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPercentage(metric.same_finger_bigram_frequency)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            SFS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPercentage(metric.same_finger_skipgram_frequency)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Scissors className="h-4 w-4" />
            Ножницы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatPercentage(metric.half_scissor_bigram_frequency + metric.full_scissor_bigram_frequency)}
          </div>
        </CardContent>
      </Card>

      {/* Дополнительные метрики */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Rolls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-semibold">{formatPercentage(metric.roll_frequency)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Alternate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-semibold">{formatPercentage(metric.alternate_frequency)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">One Hand</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-semibold">{formatPercentage(metric.onehand_frequency)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Redirect</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-semibold">{formatPercentage(metric.redirect_frequency)}</div>
        </CardContent>
      </Card>
    </div>
  );
}