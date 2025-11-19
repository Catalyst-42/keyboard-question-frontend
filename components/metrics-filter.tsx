'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Corpus, Keyboard } from '@/api';

interface MetricsFiltersProps {
  corpora: Corpus[];
  keyboards: Keyboard[];
  selectedCorpus: string;
  selectedKeyboard: string;
  onCorpusChange: (value: string) => void;
  onKeyboardChange: (value: string) => void;
}

export function MetricsFilters({
  corpora,
  keyboards,
  selectedCorpus,
  selectedKeyboard,
  onCorpusChange,
  onKeyboardChange,
}: MetricsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg bg-muted/50">
      {/* Фильтр по корпусам */}
      <div className="flex-1 space-y-2">
        <Label htmlFor="corpus-filter">Корпус</Label>
        <Select value={selectedCorpus} onValueChange={onCorpusChange}>
          <SelectTrigger id="corpus-filter">
            <SelectValue placeholder="Выберите корпус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все корпуса</SelectItem>
            {corpora.map((corpus) => (
              <SelectItem key={corpus.id} value={corpus.id.toString()}>
                {corpus.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Фильтр по клавиатурам */}
      <div className="flex-1 space-y-2">
        <Label htmlFor="keyboard-filter">Клавиатура</Label>
        <Select value={selectedKeyboard} onValueChange={onKeyboardChange}>
          <SelectTrigger id="keyboard-filter">
            <SelectValue placeholder="Выберите клавиатуру" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все клавиатуры</SelectItem>
            {keyboards.map((keyboard) => (
              <SelectItem key={keyboard.id} value={keyboard.id.toString()}>
                {keyboard.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}