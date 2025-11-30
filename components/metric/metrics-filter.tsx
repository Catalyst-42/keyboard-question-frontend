'use client';

import { Corpus, Keyboard, Layout } from '@/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '../ui/card';

interface MetricsFiltersProps {
  corpora: Corpus[];
  keyboards: Keyboard[];
  layouts?: Layout[];
  selectedCorpus: string;
  selectedKeyboard: string;
  selectedLayout?: string;
  selectedText?: string;
  onCorpusChange: (value: string) => void;
  onKeyboardChange: (value: string) => void;
  onLayoutChange?: (value: string) => void;
  onTextChange?: (value: string) => void;
}

export function MetricsFilters({
  corpora,
  keyboards,
  layouts,
  selectedCorpus,
  selectedKeyboard,
  selectedLayout,
  onCorpusChange,
  onKeyboardChange,
  onLayoutChange,
  selectedText,
  onTextChange,
}: MetricsFiltersProps) {
  return (
    <Card className="flex flex-col p-4 gap-4">
      {/* Main filter row - wraps on smaller screens */}
      <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
        {/* Filter by corpus */}
        <div className="space-y-2 flex-1 min-w-[200px]">
          <Label htmlFor="corpus-filter">Корпус</Label>
          <Select value={selectedCorpus} onValueChange={onCorpusChange}>
            <SelectTrigger id="corpus-filter" className="w-full">
              <SelectValue placeholder="Select corpus" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Любой</SelectItem>
              {corpora.map((corpus) => (
                <SelectItem key={corpus.id} value={corpus.id.toString()}>
                  {corpus.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filter by keyboard */}
        <div className="space-y-2 flex-1 min-w-[200px]">
          <Label htmlFor="keyboard-filter">Клавиатура</Label>
          <Select value={selectedKeyboard} onValueChange={onKeyboardChange}>
            <SelectTrigger id="keyboard-filter" className="w-full">
              <SelectValue placeholder="Select keyboard" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Любая</SelectItem>
              {keyboards.map((keyboard) => (
                <SelectItem key={keyboard.id} value={keyboard.id.toString()}>
                  {keyboard.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filter by layout */}
        <div className="space-y-2 flex-1 min-w-[200px]">
          <Label htmlFor="layout-filter">Раскладка</Label>
          <Select value={selectedLayout || 'all'} onValueChange={(v) => onLayoutChange && onLayoutChange(v)}>
            <SelectTrigger id="layout-filter" className="w-full">
              <SelectValue placeholder="Select layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Любая</SelectItem>
              {layouts && layouts.map((layout) => (
                <SelectItem key={layout.id} value={layout.id.toString()}>
                  {layout.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Text filter - full width on all screens */}
      <div className="space-y-2 w-full">
        <Label htmlFor="text-filter">Поиск</Label>
        <div className="relative flex items-center">
          <Input
            id="text-filter"
            value={selectedText || ''}
            onChange={(e) => onTextChange && onTextChange(e.target.value)}
            placeholder="Корпус, клавиатура или раскладка"
            className="w-full"
          />
          {selectedText && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onTextChange && onTextChange('')}
              className="absolute right-1 h-6 w-6 p-0"
            >
              ×
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
