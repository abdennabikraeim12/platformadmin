
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export interface Column<T> {
  header: ReactNode;
  accessorKey: keyof T | string;
  cell?: (item: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function Table<T>({
  data,
  columns,
  isLoading = false,
  emptyMessage = 'Aucune donnée disponible',
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-10">
        <div className="animate-pulse flex flex-col space-y-4 w-full">
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <ShadTable>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead 
                key={index} 
                className={column.className}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => {
                  const value = column.accessorKey.toString().includes('.')
                    ? column.accessorKey.toString().split('.').reduce((obj, key) => obj && obj[key as keyof typeof obj], row as any)
                    : row[column.accessorKey as keyof typeof row];
                    
                  return (
                    <TableCell 
                      key={`${rowIndex}-${colIndex}`}
                      className={cn(column.className)}
                    >
                      {column.cell ? column.cell(row) : value as ReactNode}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </ShadTable>
    </div>
  );
}

export default Table;
