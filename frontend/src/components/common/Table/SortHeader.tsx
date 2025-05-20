import { Column } from '@tanstack/react-table';

interface SortHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export function SortHeader<TData, TValue>({
  column,
  title
}: SortHeaderProps<TData, TValue>) {
  return (
    <div 
      className="flex items-center cursor-pointer"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {title}
      {{
        asc: ' ↑',
        desc: ' ↓'
      }[column.getIsSorted() as string] ?? null}
    </div>
  );
}