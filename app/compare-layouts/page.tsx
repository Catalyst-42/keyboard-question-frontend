"use client";

import { InputStyle } from '@/components/metric/card-input-style';
import { ListBigrams } from '@/components/metric/list-bigrams';
import { ListFingerUsage } from '@/components/metric/list-finger-usage';
import { ListSkipgrams } from '@/components/metric/list-skipgrams';
import { ListTrigrams } from '@/components/metric/list-trigrams';
import { PlotFingerUsage } from '@/components/metric/plot-finger-usage';
import { PlotRowUsage } from '@/components/metric/plot-row-usage';
import { PlotFingerDistance } from '@/components/metric/plot-finger-distance';
import { ListFingerDistance } from '@/components/metric/list-finger-distance';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCorpusData } from '@/hooks/use-corpus-data';
import { useKeyboardData } from '@/hooks/use-keyboard-data';
import { useLayoutData } from '@/hooks/use-layout-data';
import { useMetricData } from '@/hooks/use-metric-data';
import { useMemo, useState } from 'react';

export default function Page() {
  const { data: corpora } = useCorpusData();
  const { data: keyboards } = useKeyboardData();
  const { data: layouts, previews } = useLayoutData();
  const { allData: allMetrics } = useMetricData();

  // Left selections (empty string means nothing selected yet)
  const [leftCorpus, setLeftCorpus] = useState<string>('');
  const [leftKeyboard, setLeftKeyboard] = useState<string>('');
  const [leftLayout, setLeftLayout] = useState<string>('');

  // Right selections
  const [rightCorpus, setRightCorpus] = useState<string>('');
  const [rightKeyboard, setRightKeyboard] = useState<string>('');
  const [rightLayout, setRightLayout] = useState<string>('');

  // Helper to find keyboards that have metrics for a given corpus
  const keyboardsForCorpus = (corpusId: number | null) => {
    if (!allMetrics || corpusId === null || !keyboards) return [];
    const kbIds = new Set(allMetrics.filter(m => m.corpus === corpusId).map(m => m.keyboard));
    return keyboards.filter(k => kbIds.has(k.id));
  };

  // Helper to find layouts available for a given corpus+keyboard (based on metrics)
  const layoutsForCorpusAndKeyboard = (corpusId: number | null, keyboardId: number | null) => {
    if (!allMetrics || corpusId === null || keyboardId === null || !layouts) return [];
    const layoutIds = new Set(allMetrics.filter(m => m.corpus === corpusId && m.keyboard === keyboardId).map(m => m.layout));
    return layouts.filter(l => layoutIds.has(l.id));
  };

  // Find metric objects for left and right selections
  const leftMetric = useMemo(() => {
    if (!allMetrics || !leftCorpus || !leftKeyboard || !leftLayout) return null;
    return allMetrics.find(m =>
      Number(m.corpus) === Number(leftCorpus) &&
      Number(m.keyboard) === Number(leftKeyboard) &&
      Number(m.layout) === Number(leftLayout)
    ) || null;
  }, [allMetrics, leftCorpus, leftKeyboard, leftLayout]);

  const rightMetric = useMemo(() => {
    if (!allMetrics || !rightCorpus || !rightKeyboard || !rightLayout) return null;
    return allMetrics.find(m =>
      Number(m.corpus) === Number(rightCorpus) &&
      Number(m.keyboard) === Number(rightKeyboard) &&
      Number(m.layout) === Number(rightLayout)
    ) || null;
  }, [allMetrics, rightCorpus, rightKeyboard, rightLayout]);

  // Compute min/max range for a metric field across allMetrics
  const getMetricRange = (field: string) => {
    if (!allMetrics) return { min: 0, max: 1 };
    const vals = allMetrics.map(m => (m as any)[field]).filter(v => typeof v === 'number');
    if (!vals.length) return { min: 0, max: 1 };
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    if (min === max) {
      const delta = Math.abs(min) * 0.1 || 1;
      return { min: min - delta, max: max + delta };
    }
    return { min, max };
  };

  // Prepare small data slices (finger usage/distance/rows) for left/right plots
  const makeFingerUsageData = (m: any) => m ? [
    { finger: '1', usage: m.finger_usage_1, hand: 'left' },
    { finger: '2', usage: m.finger_usage_2, hand: 'left' },
    { finger: '3', usage: m.finger_usage_3, hand: 'left' },
    { finger: '4', usage: m.finger_usage_4, hand: 'left' },
    { finger: '5', usage: m.finger_usage_5, hand: 'left' },
    { finger: '6', usage: m.finger_usage_6, hand: 'right' },
    { finger: '7', usage: m.finger_usage_7, hand: 'right' },
    { finger: '8', usage: m.finger_usage_8, hand: 'right' },
    { finger: '9', usage: m.finger_usage_9, hand: 'right' },
    { finger: '10', usage: m.finger_usage_10, hand: 'right' },
  ] : [];

  const makeFingerDistanceData = (m: any) => m ? [
    { finger: '1', distance: m.travel_distance_finger_1, hand: 'left' },
    { finger: '2', distance: m.travel_distance_finger_2, hand: 'left' },
    { finger: '3', distance: m.travel_distance_finger_3, hand: 'left' },
    { finger: '4', distance: m.travel_distance_finger_4, hand: 'left' },
    { finger: '5', distance: m.travel_distance_finger_5, hand: 'left' },
    { finger: '6', distance: m.travel_distance_finger_6, hand: 'right' },
    { finger: '7', distance: m.travel_distance_finger_7, hand: 'right' },
    { finger: '8', distance: m.travel_distance_finger_8, hand: 'right' },
    { finger: '9', distance: m.travel_distance_finger_9, hand: 'right' },
    { finger: '10', distance: m.travel_distance_finger_10, hand: 'right' },
  ] : [];

  const makeRowUsageData = (m: any) => m ? [
    { row: 'K', usage: m.row_usage_k },
    { row: 'E', usage: m.row_usage_e },
    { row: 'D', usage: m.row_usage_d },
    { row: 'C', usage: m.row_usage_c },
    { row: 'B', usage: m.row_usage_b },
    { row: 'A', usage: m.row_usage_a },
  ] : [];

  const leftFingerUsageData = makeFingerUsageData(leftMetric);
  const leftRowUsageData = makeRowUsageData(leftMetric);
  const leftFingerDistanceData = makeFingerDistanceData(leftMetric);

  const rightFingerUsageData = makeFingerUsageData(rightMetric);
  const rightRowUsageData = makeRowUsageData(rightMetric);
  const rightFingerDistanceData = makeFingerDistanceData(rightMetric);

  const computeHandPercents = (usageData: any[]) => {
    const leftSum = usageData.filter(i => i.hand === 'left').reduce((s, it) => s + (it.usage || 0), 0);
    const rightSum = usageData.filter(i => i.hand === 'right').reduce((s, it) => s + (it.usage || 0), 0);
    const total = leftSum + rightSum;
    return {
      left: total > 0 ? (leftSum / total) * 100 : 0,
      right: total > 0 ? (rightSum / total) * 100 : 0,
    };
  };

  const leftHandPercents = computeHandPercents(leftFingerUsageData);
  const rightHandPercents = computeHandPercents(rightFingerUsageData);

  // Reusable responsive two-column renderer: on sm+ shows grid with two columns,
  // on mobile shows a horizontal scroll with fixed card width (configurable).
  const TwoColumnResponsive = ({
    left,
    right,
    mobileWidth = 'w-80',
    gridGap = 'gap-4',
    mobileContainerClass = 'overflow-x-auto py-2',
  }: any) => {
    return (
      <>
        <div className={`hidden sm:grid grid-cols-2 ${gridGap}`}>
          {left}
          {right}
        </div>

        <div className={`sm:hidden flex gap-4 ${mobileContainerClass}`}>
          {left && <div className={`${mobileWidth} shrink-0`}>{left}</div>}
          {right && <div className={`${mobileWidth} shrink-0`}>{right}</div>}
        </div>
      </>
    );
  };

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold">Сравнить раскладки</h1>
      <p className="mt-2 text-muted-foreground">Выберите корпус, клавиатуру и раскладку для первой и второй стороны.</p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {/* First panel */}
        <Card className="flex flex-col p-4 gap-4">
          <div className="font-medium">Первая сторона</div>

          <div className="flex flex-col gap-3">
            <div className="space-y-2">
              <Label htmlFor="left-corpus">Корпус</Label>
              <Select value={leftCorpus} onValueChange={v => {
                // When corpus changes, try to preserve keyboard and layout if still valid
                const newCorpusId = v ? Number(v) : null;
                const availableKeyboards = keyboardsForCorpus(newCorpusId);
                const keepKeyboard = leftKeyboard && availableKeyboards.some(k => k.id === Number(leftKeyboard));
                const nextKeyboard = keepKeyboard ? leftKeyboard : '';

                let nextLayout = '';
                if (nextKeyboard) {
                  const availableLayouts = layoutsForCorpusAndKeyboard(newCorpusId, Number(nextKeyboard));
                  if (leftLayout && availableLayouts.some(l => l.id === Number(leftLayout))) {
                    nextLayout = leftLayout;
                  }
                }

                setLeftCorpus(v);
                setLeftKeyboard(nextKeyboard);
                setLeftLayout(nextLayout);
              }}>
                <SelectTrigger id="left-corpus" className="w-full">
                  <SelectValue placeholder="Выберите корпус" />
                </SelectTrigger>
                <SelectContent>
                  {corpora?.map(c => (
                    <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="left-keyboard">Клавиатура</Label>
              <Select value={leftKeyboard} onValueChange={v => {
                // When keyboard changes, try to preserve layout if it remains available for this corpus+keyboard
                const newKeyboardId = v ? Number(v) : null;
                const corpusId = leftCorpus ? Number(leftCorpus) : null;
                let nextLayout = '';
                if (corpusId !== null && newKeyboardId !== null) {
                  const availableLayouts = layoutsForCorpusAndKeyboard(corpusId, newKeyboardId);
                  if (leftLayout && availableLayouts.some(l => l.id === Number(leftLayout))) {
                    nextLayout = leftLayout;
                  }
                }
                setLeftKeyboard(v);
                setLeftLayout(nextLayout);
              }} disabled={!leftCorpus}>
                <SelectTrigger id="left-keyboard" className="w-full">
                  <SelectValue placeholder={leftCorpus ? "Выберите клавиатуру" : "Сначала выберите корпус"} />
                </SelectTrigger>
                <SelectContent>
                  {keyboardsForCorpus(leftCorpus ? Number(leftCorpus) : null).map(k => (
                    <SelectItem key={k.id} value={k.id.toString()}>{k.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="left-layout">Раскладка</Label>
              <Select value={leftLayout} onValueChange={v => setLeftLayout(v)} disabled={!leftKeyboard}>
                <SelectTrigger id="left-layout" className="w-full">
                  <SelectValue placeholder={leftKeyboard ? "Выберите раскладку" : "Сначала выберите клавиатуру"} />
                </SelectTrigger>
                <SelectContent>
                  {layoutsForCorpusAndKeyboard(leftCorpus ? Number(leftCorpus) : null, leftKeyboard ? Number(leftKeyboard) : null).map(l => (
                    <SelectItem key={l.id} value={l.id.toString()}>{l.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Second panel */}
        <Card className="flex flex-col p-4 gap-4">
          <div className="font-medium">Вторая сторона</div>

          <div className="flex flex-col gap-3">
            <div className="space-y-2">
              <Label htmlFor="right-corpus">Корпус</Label>
              <Select value={rightCorpus} onValueChange={v => {
                const newCorpusId = v ? Number(v) : null;
                const availableKeyboards = keyboardsForCorpus(newCorpusId);
                const keepKeyboard = rightKeyboard && availableKeyboards.some(k => k.id === Number(rightKeyboard));
                const nextKeyboard = keepKeyboard ? rightKeyboard : '';

                let nextLayout = '';
                if (nextKeyboard) {
                  const availableLayouts = layoutsForCorpusAndKeyboard(newCorpusId, Number(nextKeyboard));
                  if (rightLayout && availableLayouts.some(l => l.id === Number(rightLayout))) {
                    nextLayout = rightLayout;
                  }
                }

                setRightCorpus(v);
                setRightKeyboard(nextKeyboard);
                setRightLayout(nextLayout);
              }}>
                <SelectTrigger id="right-corpus" className="w-full">
                  <SelectValue placeholder="Выберите корпус" />
                </SelectTrigger>
                <SelectContent>
                  {corpora?.map(c => (
                    <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="right-keyboard">Клавиатура</Label>
              <Select value={rightKeyboard} onValueChange={v => {
                const newKeyboardId = v ? Number(v) : null;
                const corpusId = rightCorpus ? Number(rightCorpus) : null;
                let nextLayout = '';
                if (corpusId !== null && newKeyboardId !== null) {
                  const availableLayouts = layoutsForCorpusAndKeyboard(corpusId, newKeyboardId);
                  if (rightLayout && availableLayouts.some(l => l.id === Number(rightLayout))) {
                    nextLayout = rightLayout;
                  }
                }
                setRightKeyboard(v);
                setRightLayout(nextLayout);
              }} disabled={!rightCorpus}>
                <SelectTrigger id="right-keyboard" className="w-full">
                  <SelectValue placeholder={rightCorpus ? "Выберите клавиатуру" : "Сначала выберите корпус"} />
                </SelectTrigger>
                <SelectContent>
                  {keyboardsForCorpus(rightCorpus ? Number(rightCorpus) : null).map(k => (
                    <SelectItem key={k.id} value={k.id.toString()}>{k.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="right-layout">Раскладка</Label>
              <Select value={rightLayout} onValueChange={v => setRightLayout(v)} disabled={!rightKeyboard}>
                <SelectTrigger id="right-layout" className="w-full">
                  <SelectValue placeholder={rightKeyboard ? "Выберите раскладку" : "Сначала выберите клавиатуру"} />
                </SelectTrigger>
                <SelectContent>
                  {layoutsForCorpusAndKeyboard(rightCorpus ? Number(rightCorpus) : null, rightKeyboard ? Number(rightKeyboard) : null).map(l => (
                    <SelectItem key={l.id} value={l.id.toString()}>{l.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>

      {/* Metrics comparison */}
      <div className="mt-8">
        {leftMetric || rightMetric ? (
          <div className="mt-4 space-y-8">
            {/* Блокы визуализаций рядов и характера использования будут показаны ниже (между парными и триграммными метриками) */}

            {/* Метрики дистанции: диаграмма сверху, значения снизу */}
            

            {/* 
            
            
            
            */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Метрики дистанции</h3>
              <TwoColumnResponsive
                left={leftMetric ? (
                  <PlotFingerDistance
                    fingerDistanceData={leftFingerDistanceData}
                    totalTravelDistance={leftMetric.travel_distance}
                  />
                ) : null}
                right={rightMetric ? (
                  <PlotFingerDistance
                    fingerDistanceData={rightFingerDistanceData}
                    totalTravelDistance={rightMetric.travel_distance}
                  />
                ) : null}
                mobileWidth="w-80"
                gridGap="gap-4"
                mobileContainerClass="overflow-x-auto py-2"
              />

              <div className="mt-4 grid grid-cols-2 gap-4">
                {leftMetric && (
                  <ListFingerDistance metric={leftMetric} getMetricRange={getMetricRange} referenceMetric={rightMetric} diffMode singleColumn />
                )}
                {rightMetric && (
                  <ListFingerDistance metric={rightMetric} getMetricRange={getMetricRange} referenceMetric={leftMetric} diffMode singleColumn />
                )}
              </div>
            </div>

            {/* Метрики использования */}

            {/* Визуализация использования пальцев */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Визуализация использования пальцев</h3>
              {/* Desktop / tablet: two columns */}
              <TwoColumnResponsive
                left={leftMetric ? (
                  <PlotFingerUsage
                    fingerUsageData={leftFingerUsageData}
                    leftHandUsagePercent={leftHandPercents.left}
                    rightHandUsagePercent={leftHandPercents.right}
                  />
                ) : null}
                right={rightMetric ? (
                  <PlotFingerUsage
                    fingerUsageData={rightFingerUsageData}
                    leftHandUsagePercent={rightHandPercents.left}
                    rightHandUsagePercent={rightHandPercents.right}
                  />
                ) : null}
                mobileWidth="w-80"
                gridGap="gap-4"
                mobileContainerClass="overflow-x-auto py-2"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Метрики использования</h3>
              <div className="grid grid-cols-2 gap-4">
                {leftMetric && (
                  <ListFingerUsage metric={leftMetric} getMetricRange={getMetricRange} referenceMetric={rightMetric} diffMode singleColumn />
                )}
                {rightMetric && (
                  <ListFingerUsage metric={rightMetric} getMetricRange={getMetricRange} referenceMetric={leftMetric} diffMode singleColumn />
                )}
              </div>
            </div>

            {/* Использование рядов (помещено сразу после блока метрик дистанции) */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Использование рядов</h3>
              <TwoColumnResponsive
                left={leftMetric ? <PlotRowUsage rowUsageData={leftRowUsageData} /> : null}
                right={rightMetric ? <PlotRowUsage rowUsageData={rightRowUsageData} /> : null}
                mobileWidth="w-80"
                gridGap="gap-6"
                mobileContainerClass="overflow-x-auto py-2"
              />
            </div>
            {/* Парные метрики */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Парные метрики</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  {leftMetric && (
                    <>
                      <ListBigrams metric={leftMetric} getMetricRange={getMetricRange} referenceMetric={rightMetric} diffMode singleColumn />

                      <ListSkipgrams metric={leftMetric} getMetricRange={getMetricRange} referenceMetric={rightMetric} diffMode singleColumn />
                    </>
                  )}
                </div>
                <div className="space-y-4">
                  {rightMetric && (
                    <>
                      <ListBigrams metric={rightMetric} getMetricRange={getMetricRange} referenceMetric={leftMetric} diffMode singleColumn />

                      <ListSkipgrams metric={rightMetric} getMetricRange={getMetricRange} referenceMetric={leftMetric} diffMode singleColumn />
                    </>
                  )}
                </div>
              </div>
            </div>


            {/* Характер использования (помещён сразу после блока метрик дистанции) */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Характер использования</h3>
              <TwoColumnResponsive
                left={leftMetric ? <InputStyle metric={leftMetric} /> : null}
                right={rightMetric ? <InputStyle metric={rightMetric} /> : null}
                mobileWidth="w-80"
                gridGap="gap-6"
                mobileContainerClass="overflow-x-auto py-2"
              />
            </div>

            {/* Триграммные метрики */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Триграммные метрики</h3>
              <div className="grid grid-cols-2 gap-4">
                {leftMetric && (
                  <ListTrigrams metric={leftMetric} getMetricRange={getMetricRange} referenceMetric={rightMetric} diffMode singleColumn />
                )}
                {rightMetric && (
                  <ListTrigrams metric={rightMetric} getMetricRange={getMetricRange} referenceMetric={leftMetric} diffMode singleColumn />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground mt-8">Выберите раскладки для сравнения</div>
        )}
      </div>
    </div>
  );
}
