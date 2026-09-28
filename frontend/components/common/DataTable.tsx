import React from 'react';
import { cn } from '@/lib/utils';

export interface ColumnDef<T> {
  key: string;
  header: string;
  width?: string;
  isSticky?: boolean;
  align?: 'left' | 'center' | 'right';
  render?: (item: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  className?: string;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  className,
  emptyMessage = 'No technical specifications available.',
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="p-8 text-center bg-industrial-900 border border-industrial-800 rounded-sm text-sm text-industrial-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn('w-full overflow-x-auto rounded-sm border border-industrial-800 shadow-industrial-md', className)}>
      <table className="w-full text-left text-xs sm:text-sm border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="bg-industrial-950 border-b border-industrial-750 text-industrial-300 font-bold uppercase tracking-wider text-[11px]">
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className={cn(
                  'px-4 py-3.5 bg-industrial-950/90 whitespace-nowrap',
                  col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left',
                  col.isSticky && 'sticky left-0 z-20 shadow-[2px_0_5px_rgba(0,0,0,0.5)]'
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-industrial-800/80 bg-industrial-900">
          {data.map((item, rowIndex) => (
            <tr
              key={keyExtractor(item, rowIndex)}
              className={cn(
                'transition-colors hover:bg-industrial-850',
                rowIndex % 2 === 1 ? 'bg-industrial-900/40' : 'bg-industrial-900'
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    'px-4 py-3.5 whitespace-nowrap text-industrial-200',
                    col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left',
                    col.isSticky && 'sticky left-0 bg-industrial-900 z-10 font-bold text-white shadow-[2px_0_5px_rgba(0,0,0,0.5)]'
                  )}
                >
                  {col.render
                    ? col.render(item, rowIndex)
                    : (item as Record<string, unknown>)[col.key] !== undefined
                    ? String((item as Record<string, unknown>)[col.key])
                    : '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
