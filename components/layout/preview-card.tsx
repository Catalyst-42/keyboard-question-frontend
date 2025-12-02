"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageIcon, Layers2, Flame } from 'lucide-react';

type PreviewCardProps = {
  previewType?: 'layout' | 'heatmap'; // controlled if provided
  onPreviewTypeChange?: (t: 'layout' | 'heatmap') => void;
  initialPreviewType?: 'layout' | 'heatmap'; // used when uncontrolled
  selectedPreviewUrl?: string | null;
  heatmapUrl?: string | null;
  title?: string;
  layoutName?: string;
};

export default function PreviewCard({
  previewType,
  onPreviewTypeChange,
  initialPreviewType = 'layout',
  selectedPreviewUrl,
  heatmapUrl,
  title = 'Превью',
  layoutName = ''
}: PreviewCardProps) {
  const [internalType, setInternalType] = useState<'layout' | 'heatmap'>(previewType ?? initialPreviewType);

  // keep internal in sync if component is controlled
  useEffect(() => {
    if (previewType !== undefined) setInternalType(previewType);
  }, [previewType]);

  const setType = (t: 'layout' | 'heatmap') => {
    if (onPreviewTypeChange) onPreviewTypeChange(t);
    if (previewType === undefined) setInternalType(t);
  };

  const currentType = previewType !== undefined ? previewType : internalType;
  const showLayout = currentType === 'layout' && !!selectedPreviewUrl;
  const showHeatmap = currentType === 'heatmap' && !!heatmapUrl;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>{title}</CardTitle>
        <div className="flex gap-3">
          <Button
            variant={currentType === 'layout' ? 'default' : 'outline'}
            size="icon-sm"
            onClick={() => setType('layout')}
            aria-label="Показать превью раскладки"
          >
            <Layers2 className="h-4 w-4" />
          </Button>
          <Button
            variant={currentType === 'heatmap' ? 'default' : 'outline'}
            size="icon-sm"
            onClick={() => setType('heatmap')}
            disabled={!heatmapUrl}
            aria-label="Показать тепловую карту"
          >
            <Flame className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="relative w-full overflow-hidden rounded-md aspect-23/9">
          {showLayout ? (
            <Image
              src={selectedPreviewUrl as string}
              alt={`Превью раскладки ${layoutName}`}
              fill
              className="object-contain"
              sizes="(max-width: 2048px) 100vw, 66vw"
            />
          ) : showHeatmap ? (
            <Image
              src={heatmapUrl as string}
              alt={`Тепловая карта ${layoutName}`}
              fill
              className="object-contain"
              sizes="(max-width: 2048px) 100vw, 66vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
              <div className="text-center text-muted-foreground">
                <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">
                  {currentType === 'layout'
                    ? 'Превью недоступно для выбранной клавиатуры'
                    : 'Тепловая карта недоступна'
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
