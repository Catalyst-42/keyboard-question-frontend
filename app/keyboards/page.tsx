'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useKeyboardData } from '@/hooks/use-keyboard-data';
import { AlertCircle, BookOpen, Keyboard as KeyboardIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function KeyboardsPage() {
  const { data, loading, error } = useKeyboardData();

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-2">
          <KeyboardIcon className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Keyboards</h1>
        </div>

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Data */}
        {!loading && !error && data && data.length > 0 && (
          <>
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">Total keyboards: {data.length}</div>
            </div>

            {/* make a client-side filtered list with all items open */}
            <KeyboardsList items={data} />
          </>
        )}

        {/* Нет данных */}
        {!loading && !error && data && data.length === 0 && (
          <div className="p-4 bg-muted rounded">No keyboards available</div>
        )}
      </div>
    </div>
  );
}

function KeyboardsList({ items }: { items: any[] }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'keys'>('name');

  const visible = useMemo(() => {
    return items
      .filter((k) => k.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.keys || 0) - (a.keys || 0);
      });
  }, [items, search, sortBy]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="border px-2 py-1 rounded text-sm"
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="border px-2 py-1 rounded text-sm">
          <option value="name">Sort: Name</option>
          <option value="keys">Sort: Keys</option>
        </select>
      </div>

      <Accordion type="multiple" defaultValue={visible.map((k) => String(k.id))}>
        {visible.map((keyboard) => (
          <AccordionItem key={keyboard.id} value={String(keyboard.id)}>
            <AccordionTrigger>
              <div className="flex items-center gap-3 w-full">
                <BookOpen className="h-5 w-5" />
                <span className="font-medium">{keyboard.name}</span>
                <span className="ml-auto text-sm text-muted-foreground">{keyboard.form_factor}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <article className="prose-sm">
                {keyboard.keyboard_preview && (
                  <div className="w-full max-w-[320px] mb-2">
                    <Image src={keyboard.keyboard_preview} alt={keyboard.name} width={320} height={180} className="object-contain" />
                  </div>
                )}
                <ul>
                  <li>Keys: {keyboard.keys}</li>
                  <li>Rows: {keyboard.rows}</li>
                  <li>Form factor: {keyboard.form_factor}</li>
                </ul>
                <div className="mt-2">
                  <Link href={`/keyboards/${keyboard.id}`} className="text-sm text-primary hover:underline">Details →</Link>
                </div>
              </article>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
