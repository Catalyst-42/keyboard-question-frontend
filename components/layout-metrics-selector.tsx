'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Corpus, Keyboard } from '@/api';

interface LayoutMetricsSelectorProps {
  corpora: Corpus[];
  keyboards: Keyboard[];
  selectedCorpus: string;
  selectedKeyboard: string;
  onCorpusChange: (value: string) => void;
  onKeyboardChange: (value: string) => void;
}

export function LayoutMetricsSelector({
  corpora,
  keyboards,
  selectedCorpus,
  selectedKeyboard,
  onCorpusChange,
  onKeyboardChange,
}: LayoutMetricsSelectorProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg bg-muted/50">
      {/* Выбор корпуса */}
      <div className="flex-1 space-y-2">
        <Label htmlFor="metrics-corpus-select">Корпус для метрик</Label>
        <Select value={selectedCorpus} onValueChange={onCorpusChange}>
          <SelectTrigger id="metrics-corpus-select">
            <SelectValue placeholder="Выберите корпус" />
          </SelectTrigger>
          <SelectContent>
            {corpora.map((corpus) => (
              <SelectItem key={corpus.id} value={corpus.id.toString()}>
                {corpus.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Выбор клавиатуры */}
      <div className="flex-1 space-y-2">
        <Label htmlFor="metrics-keyboard-select">Клавиатура для метрик</Label>
        <Select value={selectedKeyboard} onValueChange={onKeyboardChange}>
          <SelectTrigger id="metrics-keyboard-select">
            <SelectValue placeholder="Выберите клавиатуру" />
          </SelectTrigger>
          <SelectContent>
            {keyboards.map((keyboard) => (
              <SelectItem key={keyboard.id} value={keyboard.id.toString()}>
                {keyboard.name} ({keyboard.form_factor})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}