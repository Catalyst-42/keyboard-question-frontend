'use client';

import { MetricWithRelations } from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftRight, Divide } from 'lucide-react';

interface LayoutCharacterProps {
  metric: MetricWithRelations;
}

export function InputStyle({ metric }: LayoutCharacterProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <ArrowLeftRight className="h-4 w-4" />
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
  );
}
