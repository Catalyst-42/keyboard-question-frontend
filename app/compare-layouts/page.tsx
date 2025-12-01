"use client";

import { InputStyle } from '@/components/metric/card-input-style';
import { ListBigrams } from '@/components/metric/list-bigrams';
import { ListFingerDistance } from '@/components/metric/list-finger-distance';
import { ListFingerUsage } from '@/components/metric/list-finger-usage';
import { ListSkipgrams } from '@/components/metric/list-skipgrams';
import { ListTrigrams } from '@/components/metric/list-trigrams';
import { PlotFingerDistance } from '@/components/metric/plot-finger-distance';
import { PlotFingerUsage } from '@/components/metric/plot-finger-usage';
import { PlotRowUsage } from '@/components/metric/plot-row-usage';
import { Card, CardHeader } from '@/components/ui/card';
import { H1 } from '@/components/ui/h1';
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


  const [leftCorpus, setLeftCorpus] = useState<string>('');
  const [leftKeyboard, setLeftKeyboard] = useState<string>('');
  const [leftLayout, setLeftLayout] = useState<string>('');


  const [rightCorpus, setRightCorpus] = useState<string>('');
  const [rightKeyboard, setRightKeyboard] = useState<string>('');
  const [rightLayout, setRightLayout] = useState<string>('');


  const keyboardsForCorpus = (corpusId: number | null) => {
    if (!allMetrics || corpusId === null || !keyboards) return [];
    const kbIds = new Set(allMetrics.filter(m => m.corpus === corpusId).map(m => m.keyboard));
    return keyboards.filter(k => kbIds.has(k.id));
  };


  const layoutsForCorpusAndKeyboard = (corpusId: number | null, keyboardId: number | null) => {
    if (!allMetrics || corpusId === null || keyboardId === null || !layouts) return [];
    const layoutIds = new Set(allMetrics.filter(m => m.corpus === corpusId && m.keyboard === keyboardId).map(m => m.layout));
    return layouts.filter(l => layoutIds.has(l.id));
  };


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

  const TwoColumnResponsive = ({
    left,
    right,
    mobileWidth = 'w-82',
    gridGap = 'gap-4',
    mobileContainerClass = 'overflow-x-auto pb-6',
  }: any) => {
    return (
      <>
        <div className={`hidden sm:grid grid-cols-2 ${gridGap}`}>
          {left}
          {right}
        </div>

        <div className={`sm:hidden flex gap-4 ${mobileContainerClass}`}>
          <div className={`${mobileWidth} shrink-0`}>{left}</div>
          <div className={`${mobileWidth} shrink-0`}>{right}</div>
        </div>
      </>
    );
  };
  return (
    <div className="container py-8">
      <H1>Сравнить раскладки</H1>

      {/* Select layout metric by corpus and keyboard */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {/* First side */}
        <Card className="flex flex-col p-4 gap-4">
          <div className="flex flex-col gap-3">
            <div className="space-y-2">
              <Label htmlFor="left-corpus">Корпус</Label>
              <Select value={leftCorpus} onValueChange={v => {

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
                  {layoutsForCorpusAndKeyboard(leftCorpus ? Number(leftCorpus) : null, leftKeyboard ? Number(leftKeyboard) : null)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(l => (
                      <SelectItem key={l.id} value={l.id.toString()}>{l.name}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col p-4 gap-4">
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
                  {layoutsForCorpusAndKeyboard(rightCorpus ? Number(rightCorpus) : null, rightKeyboard ? Number(rightKeyboard) : null)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(l => (
                      <SelectItem key={l.id} value={l.id.toString()}>{l.name}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>

      {/* Display comparsion */}
      <div className="mt-8">
        {leftMetric && rightMetric ? (
          <div className="mt-4 space-y-8">
            {/* Distance */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Метрики дистанции</h3>
              <TwoColumnResponsive
                left={
                  <PlotFingerDistance
                    fingerDistanceData={leftFingerDistanceData}
                    totalTravelDistance={leftMetric.travel_distance}
                  />
                }
                right={
                  <PlotFingerDistance
                    fingerDistanceData={rightFingerDistanceData}
                    totalTravelDistance={rightMetric.travel_distance}
                  />
                }
              />

              <div className="mt-4 grid grid-cols-2 gap-4">
                <ListFingerDistance metric={leftMetric} getMetricRange={getMetricRange} referenceMetric={rightMetric} diffMode singleColumn />
                <ListFingerDistance metric={rightMetric} getMetricRange={getMetricRange} referenceMetric={leftMetric} diffMode singleColumn />
              </div>
            </div>

            {/* Finger usage */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Визуализация использования пальцев</h3>
              <TwoColumnResponsive
                left={
                  <PlotFingerUsage
                    fingerUsageData={leftFingerUsageData}
                    leftHandUsagePercent={leftHandPercents.left}
                    rightHandUsagePercent={leftHandPercents.right}
                  />
                }
                right={
                  <PlotFingerUsage
                    fingerUsageData={rightFingerUsageData}
                    leftHandUsagePercent={rightHandPercents.left}
                    rightHandUsagePercent={rightHandPercents.right}
                  />
                }
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Метрики использования</h3>
              <div className="grid grid-cols-2 gap-4">
                <ListFingerUsage metric={leftMetric} getMetricRange={getMetricRange} referenceMetric={rightMetric} diffMode singleColumn />
                <ListFingerUsage metric={rightMetric} getMetricRange={getMetricRange} referenceMetric={leftMetric} diffMode singleColumn />
              </div>
            </div>

            {/* Row usage */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Использование рядов</h3>
              <TwoColumnResponsive
                left={<PlotRowUsage rowUsageData={leftRowUsageData} />}
                right={<PlotRowUsage rowUsageData={rightRowUsageData} />}
              />
            </div>

            {/* Bigram metrics */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Парные метрики</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <ListBigrams metric={leftMetric} getMetricRange={getMetricRange} referenceMetric={rightMetric} diffMode singleColumn />
                  <ListSkipgrams metric={leftMetric} getMetricRange={getMetricRange} referenceMetric={rightMetric} diffMode singleColumn />
                </div>

                <div className="space-y-4">
                  <ListBigrams metric={rightMetric} getMetricRange={getMetricRange} referenceMetric={leftMetric} diffMode singleColumn />
                  <ListSkipgrams metric={rightMetric} getMetricRange={getMetricRange} referenceMetric={leftMetric} diffMode singleColumn />
                </div>
              </div>
            </div>

            {/* Input style */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Характер использования</h3>
              <TwoColumnResponsive
                left={<InputStyle metric={leftMetric} />}
                right={<InputStyle metric={rightMetric} />}
              />
            </div>

            {/* Trigrams */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Триграммные метрики</h3>
              <div className="grid grid-cols-2 gap-4">
                <ListTrigrams metric={leftMetric} getMetricRange={getMetricRange} referenceMetric={rightMetric} diffMode singleColumn />
                <ListTrigrams metric={rightMetric} getMetricRange={getMetricRange} referenceMetric={leftMetric} diffMode singleColumn />
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
