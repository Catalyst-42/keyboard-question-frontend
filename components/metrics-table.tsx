'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { MetricWithRelations, MetricColumn, SortState } from '@/api';
import { ChevronsUpDown, ChevronUp, ChevronDown, Eye } from 'lucide-react';

interface MetricsTableProps {
  metrics: MetricWithRelations[];
  columns: MetricColumn[];
  sortState: SortState;
  onSortChange: (sort: SortState) => void;
  onColumnVisibilityChange: (columnId: string, isVisible: boolean) => void;
}

export function MetricsTable({
  metrics,
  columns,
  sortState,
  onSortChange,
  onColumnVisibilityChange,
}: MetricsTableProps) {
  const visibleColumns = columns.filter(col => col.isVisible);

  // Функции для форматирования значений
  const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const formatDistance = (value: number): string => {
    return value.toFixed(1);
  };

  const formatValue = (value: any, column: MetricColumn): string => {
    if (typeof value === 'number') {
      if (column.id.includes('usage') || column.id.includes('frequency')) {
        return formatPercentage(value);
      }
      if (column.id.includes('distance')) {
        return formatDistance(value);
      }
      return value.toFixed(2);
    }
    return String(value || '');
  };

  // Функция для сортировки
  const handleSort = (columnId: string) => {
    if (sortState.column === columnId) {
      onSortChange({
        column: columnId as any,
        direction: sortState.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      onSortChange({
        column: columnId as any,
        direction: 'asc',
      });
    }
  };

  // Получаем иконку для сортировки
  const getSortIcon = (columnId: string) => {
    if (sortState.column !== columnId) {
      return <ChevronsUpDown className="h-4 w-4" />;
    }
    return sortState.direction === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      {/* Управление колонками */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Показано: {metrics.length} записей
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Колонки
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {columns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.isVisible}
                onCheckedChange={(checked) => 
                  onColumnVisibilityChange(column.id, checked as boolean)
                }
              >
                {column.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Таблица */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.map((column) => (
                <TableHead key={column.id} className={column.isNumeric ? 'text-right' : 'text-left'}>
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
            {metrics.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={visibleColumns.length} 
                  className="h-24 text-center"
                >
                  Нет данных для отображения
                </TableCell>
              </TableRow>
            ) : (
              metrics.map((metric) => (
                <TableRow key={metric.id}>
                  {visibleColumns.map((column) => (
                    <TableCell 
                      key={column.id} 
                      className={column.isNumeric ? 'text-right font-mono text-sm' : 'text-left'}
                    >
                      {formatValue(metric[column.id as keyof MetricWithRelations], column)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}