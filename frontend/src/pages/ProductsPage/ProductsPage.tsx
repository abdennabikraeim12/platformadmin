import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ProductTable } from '../../components/products/ProductTable';
import { ProductForm } from '../../components/products/ProductForm';
import { useProducts } from '../../hooks/useProducts';
import { useDeleteProduct } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { Product, CreateProductDto } from '../../types/product';
import { ProductFilter } from '../../components/products/ProductFilter';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

export function ProductsPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const { data: products, isLoading } = useProducts(filters);
  const { data: categories } = useCategories();
  const deleteMutation = useDeleteProduct();

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleRowClick = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          icon={<PlusIcon className="h-5 w-5" />}
        >
          Add Product
        </Button>
      </div>

      <ProductFilter onFilterChange={setFilters} categories={categories} />

      <div className="mt-6">
        <ProductTable
          data={products || []}
          loading={isLoading}
          onRowClick={handleRowClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Product"
      >
        <ProductForm
          onSubmit={(data: CreateProductDto) => {
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        title="Edit Product"
      >
        {editingProduct && (
          <ProductForm
            initialData={editingProduct}
            onSubmit={(data) => {
              setEditingProduct(null);
            }}
            onCancel={() => setEditingProduct(null)}
          />
        )}
      </Modal>
    </div>
  );
}