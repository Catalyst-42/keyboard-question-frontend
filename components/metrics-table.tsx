'use client';

import { MetricColumn, MetricWithRelations, SortState } from '@/api';
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
import { ChevronDown, ChevronsUpDown, ChevronUp, Eye } from 'lucide-react';
import Link from 'next/link';

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

  // Functions for formatting values
  const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const formatDistance = (value: number): string => {
    return value.toFixed(3);
  };

  const formatValue = (value: any, column: MetricColumn): string => {
    if (typeof value === 'number') {
      if (column.id.includes('usage') || column.id.includes('frequency')) {
        return formatPercentage(value);
      }
      if (column.id.includes('distance')) {
        return formatDistance(value);
      }
      return value.toFixed(3);
    }
    return String(value || '');
  };

  // Sorting
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

  // Get icon for sorting
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
      {/* Columns control */}
      <div className="flex justify-between items-center">
        <div className="text-sm">
          Записей: {metrics.length}
        </div>

        <DropdownMenu>
          {/* Filter fields */}
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Колонки
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-auto">
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
                      className="text-center"
                    >
                      {column.id === 'keyboard_name' ? (
                        <Link href={`/keyboards/${metric.keyboard}`}>{metric.keyboard_name || ''}</Link>
                      ) : column.id === 'layout_name' ? (
                        <Link href={`/layouts/${metric.layout}`}>{metric.layout_name || ''}</Link>
                      ) : column.id === 'corpus_name' ? (
                        <Link href={`/corpora/${metric.corpus}`}>{metric.corpus_name || ''}</Link>
                      ) : (
                        formatValue(metric[column.id as keyof MetricWithRelations], column)
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
  );
}