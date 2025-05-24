
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import ProductTable from '@/components/products/ProductTable';
import ProductForm from '@/components/products/ProductForm';
import { SortDirection } from '@/components/common/Table/SortHeader';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/useProducts';
import { Product } from '@/types/product';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string | null>('name');
  const [sortOrder, setSortOrder] = useState<SortDirection>('asc');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  
  const [queryParams, setQueryParams] = useState({
    page: currentPage,
    limit: pageSize,
    search: searchQuery,
    sortBy: sortBy as any,
    sortOrder,
  });

  useEffect(() => {
    setQueryParams({
      page: currentPage,
      limit: pageSize,
      search: searchQuery,
      sortBy: sortBy as any,
      sortOrder,
    });
  }, [currentPage, pageSize, searchQuery, sortBy, sortOrder]);

  const { data, isLoading } = useProducts(queryParams);
  const products = data?.data || [];
  const totalProducts = data?.total || 0;

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); 
  };

  const handleSort = (key: string, direction: SortDirection) => {
    setSortBy(direction === null ? null : key);
    setSortOrder(direction);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); 
  };

  const handleAddProduct = () => {
    setSelectedProduct(undefined);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleFormSubmit = (productData: Partial<Product>) => {
    if (selectedProduct) {
      updateMutation.mutate({ id: selectedProduct.id, product: productData });
    } else {
      createMutation.mutate(productData as any);
    }
    setIsFormOpen(false);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
  };

  const handleGlobalSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <Layout onSearch={handleGlobalSearch}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Produits</h1>
          <p className="text-muted-foreground">
            Gérez votre catalogue de produits avec des fonctionnalités complètes de recherche, de tri et de filtrage.
          </p>
        </div>

        <ProductTable
          products={products}
          totalProducts={totalProducts}
          currentPage={currentPage}
          pageSize={pageSize}
          isLoading={isLoading}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onSort={handleSort}
          onSearch={handleSearch}
          onAdd={handleAddProduct}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {selectedProduct ? 'Modifier le produit' : 'Ajouter un produit'}
              </DialogTitle>
            </DialogHeader>
            <ProductForm
              product={selectedProduct}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              isLoading={createMutation.isPending || updateMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default ProductsPage;
