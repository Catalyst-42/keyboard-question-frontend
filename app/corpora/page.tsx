'use client';

import { Loader2, AlertCircle, Eye, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { H1 } from '@/components/ui/h1';
import { useCorpusData } from '@/hooks/use-corpus-data';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface Column {
  id: string;
  label: string;
  isVisible: boolean;
  isNumeric?: boolean;
}

export default function CorporaPage() {
  const { data: corpora, loading, error } = useCorpusData();

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  const [search, setSearch] = useState('');
  const [sortState, setSortState] = useState<{ column: string; direction: 'asc' | 'desc' }>({
    column: 'name',
    direction: 'asc'
  });

  const [columns, setColumns] = useState<Column[]>([
    { id: 'name', label: 'Название', isVisible: true },
    { id: 'language', label: 'Язык', isVisible: true },
    { id: 'size', label: 'Размер', isVisible: true, isNumeric: true },
    { id: 'unique_symbols', label: 'Уникальные символы', isVisible: true, isNumeric: true },
  ]);

  const visible = useMemo(() => {
    if (!corpora) return [];
    
    let filtered = corpora.filter((c) => 
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    // Sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortState.column as keyof typeof a];
      let bValue: any = b[sortState.column as keyof typeof b];

      if (sortState.column === 'size' || sortState.column === 'unique_symbols') {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      } else {
        aValue = String(aValue || '').toLowerCase();
        bValue = String(bValue || '').toLowerCase();
      }

      if (sortState.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [corpora, search, sortState]);

  const visibleColumns = columns.filter(col => col.isVisible);

  const handleSort = (columnId: string) => {
    if (sortState.column === columnId) {
      setSortState({
        column: columnId,
        direction: sortState.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortState({
        column: columnId,
        direction: 'asc',
      });
    }
  };

  const getSortIcon = (columnId: string) => {
    if (sortState.column !== columnId) {
      return <ChevronsUpDown className="h-4 w-4" />;
    }
    return sortState.direction === 'asc' ?
      <ChevronUp className="h-4 w-4" /> :
      <ChevronDown className="h-4 w-4" />;
  };

  const handleColumnVisibilityChange = (columnId: string, isVisible: boolean) => {
    setColumns(columns.map(col => 
      col.id === columnId ? { ...col, isVisible } : col
    ));
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <H1>Корпуса текстов</H1>

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Data */}
        {!loading && !error && corpora && (
          <>
            {/* Filter Card */}
            <Card className="flex flex-col p-4 gap-4">
              <div className="space-y-2 w-full">
                <Label htmlFor="search">Поиск</Label>
                <div className="relative flex items-center">
                  <Input
                    id="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Корпус"
                    className="w-full"
                  />
                  {search && (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setSearch('')}
                      className="absolute right-1 h-6 w-6 p-0"
                    >
                      ×
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            {/* Table */}
            <div className="space-y-4">
              {/* Columns control */}
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  Записей: {visible.length}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-[1.2rem] w-[1.2rem] mr-2" />
                      Колонки
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-auto">
                    {columns.map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.isVisible}
                        onCheckedChange={(checked) =>
                          handleColumnVisibilityChange(column.id, checked as boolean)
                        }
                      >
                        {column.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {visibleColumns.map((column) => (
                        <TableHead key={column.id}>
                          <Button
                            variant="ghost"
                            onClick={() => handleSort(column.id)}
                            className="h-auto p-0 font-medium hover:bg-transparent"
                          >
                            {column.label}
                            {getSortIcon(column.id)}
                          </Button>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visible.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={visibleColumns.length}
                          className="h-24 text-center"
                        >
                          Нет данных для отображения
                        </TableCell>
                      </TableRow>
                    ) : (
                      visible.map((corpus) => (
                        <TableRow key={corpus.id}>
                          {visibleColumns.map((column) => (
                            <TableCell
                              key={column.id}
                              className="text-center"
                            >
                              {column.id === 'name' ? (
                                <Link 
                                  href={`/corpora/${corpus.id}`}
                                >
                                  {corpus.name}
                                </Link>
                              ) : column.id === 'size' ? (
                                formatNumber(corpus.size)
                              ) : column.id === 'unique_symbols' ? (
                                formatNumber(corpus.unique_symbols)
                              ) : (
                                String(corpus[column.id as keyof typeof corpus] || '')
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}