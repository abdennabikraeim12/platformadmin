import { ColumnDef } from '@tanstack/react-table';
import { Product } from '../../types/product';
import { DataTable } from '../common/Table/Table';
import { Button } from '../common/Button';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ProductTableProps {
  data: Product[];
  loading?: boolean;
  onRowClick?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (id: number) => void;
}

const columns = (onEdit?: (product: Product) => void, onDelete?: (id: number) => void): ColumnDef<Product>[] => [
  {
    accessorKey: 'name',
    header: 'Nom',
    cell: ({ row }) => (
      <div className="font-medium">{row.original.name}</div>
    )
  },
  {
    accessorKey: 'price',
    header: 'Prix',
    cell: ({ row }) => (
      <div>{row.original.price.toFixed(2)} €</div>
    )
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ row }) => (
      <div className={row.original.stock < 5 ? 'text-red-500' : ''}>
        {row.original.stock}
      </div>
    )
  },
  {
    accessorKey: 'category.name',
    header: 'Catégorie'
  },
  {
    accessorKey: 'createdAt',
    header: 'Date création',
    cell: ({ row }) => (
      <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        {onEdit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(row.original)}
            icon={<PencilIcon className="h-4 w-4" />}
          />
        )}
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(row.original.id)}
            icon={<TrashIcon className="h-4 w-4 text-red-500" />}
          />
        )}
      </div>
    ),
  }
];

export function ProductTable({ data, loading, onRowClick, onEdit, onDelete }: ProductTableProps) {
  return (
    <DataTable
      data={data}
      columns={columns(onEdit, onDelete)}
      pagination
      sorting
      searchKey="name"
      onRowClick={onRowClick}
      loading={loading}
    />
  );
}