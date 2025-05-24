
import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { formatCurrency, formatDate } from '@/utils/formatters';
import Table from '@/components/common/Table/Table';
import Pagination from '@/components/common/Table/Pagination';
import SortHeader, { SortDirection } from '@/components/common/Table/SortHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Search, Plus, MoreVertical, Pencil, Trash } from 'lucide-react';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';

interface ProductTableProps {
  products: Product[];
  totalProducts: number;
  currentPage: number;
  pageSize: number;
  isLoading: boolean;
  sortBy: string | null;
  sortOrder: SortDirection;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSort: (key: string, direction: SortDirection) => void;
  onSearch: (query: string) => void;
  onAdd: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductTable = ({
  products,
  totalProducts,
  currentPage,
  pageSize,
  isLoading,
  sortBy,
  sortOrder,
  onPageChange,
  onPageSizeChange,
  onSort,
  onSearch,
  onAdd,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(totalProducts / pageSize)));
  }, [totalProducts, pageSize]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const columns = [
    {
      header: (
        <SortHeader
          label="Nom"
          sortKey="name"
          currentSortKey={sortBy}
          currentSortDirection={sortOrder}
          onSort={onSort}
        />
      ),
      accessorKey: 'name',
      cell: (product: Product) => (
        <div className="flex items-center gap-3">
          <span className="font-medium">{product.name}</span>
        </div>
      ),
    },
    {
      header: (
        <SortHeader
          label="Stock"
          sortKey="stock"
          currentSortKey={sortBy}
          currentSortDirection={sortOrder}
          onSort={onSort}
        />
      ),
      accessorKey: 'stock',
      cell: (product: Product) => {
        let colorClass = '';
        if (product.stock <= 0) {
          colorClass = 'text-red-500';
        } else if (product.stock < 5) {
          colorClass = 'text-amber-500';
        }
        return <span className={colorClass}>{product.stock}</span>;
      },
    },
    {
      header: (
        <SortHeader
          label="Prix"
          sortKey="price"
          currentSortKey={sortBy}
          currentSortDirection={sortOrder}
          onSort={onSort}
        />
      ),
      accessorKey: 'price',
      cell: (product: Product) => formatCurrency(product.price),
    },
    {
      header: (
        <SortHeader
          label="Catégorie"
          sortKey="category"
          currentSortKey={sortBy}
          currentSortDirection={sortOrder}
          onSort={onSort}
        />
      ),
      accessorKey: 'category.name',
    },
    {
      header: (
        <SortHeader
          label="Ventes"
          sortKey="orderCount"
          currentSortKey={sortBy}
          currentSortDirection={sortOrder}
          onSort={onSort}
        />
      ),
      accessorKey: 'orderCount',
    },
    {
      header: "Date de création",
      accessorKey: 'createdAt',
      cell: (product: Product) => formatDate(product.createdAt),
    },
    {
      header: "",
      accessorKey: 'actions',
      cell: (product: Product) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(product)}>
                <Pencil className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Trash className="mr-2 h-4 w-4" />
                    Supprimer
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action ne peut pas être annulée. Ce produit sera définitivement supprimé de la base de données.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(product.id)}>
                      Supprimer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher un produit..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <Button onClick={onAdd} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un produit
        </Button>
      </div>

      <Table
        data={products}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="Aucun produit trouvé"
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalProducts}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

export default ProductTable;
