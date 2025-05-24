import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../api/productApi';
import { Product, ProductsRequestParams } from '../types/product';
import { toast } from 'sonner';

export function useProducts(params: ProductsRequestParams) {
  return useQuery({
    queryKey: ['/api/products', params],
    queryFn: () => productApi.getProducts(params),
    staleTime: 60 * 1000 
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['/api/products', id],
    queryFn: () => productApi.getProduct(id),
    enabled: !!id,
    retry: 1 
  });
}

export function useLowStockProducts() {
  return useQuery({
    queryKey: ['/api/products/low-stock'],
    queryFn: () => productApi.getLowStockProducts(),
    refetchInterval: 5 * 60 * 1000 
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'orderCount'>) => 
      productApi.createProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['/api/products'] 
      });
      toast.success('Produit créé avec succès !');
    },
    onError: (error) => {
      toast.error(`Erreur: ${error instanceof Error ? error.message : 'Échec de la création'}`);
    }
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, product }: { id: number; product: Partial<Product> }) => 
      productApi.updateProduct(id, product),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ 
        queryKey: ['/api/products'] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['/api/products', data.id] 
      });
      toast.success('Produit mis à jour avec succès !');
    },
    onError: (error) => {
      toast.error(`Erreur: ${error instanceof Error ? error.message : 'Échec de la mise à jour'}`);
    }
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => productApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['/api/products'] 
      });
      toast.success('Produit supprimé avec succès !');
    },
    onError: (error) => {
      toast.error(`Erreur: ${error instanceof Error ? error.message : 'Échec de la suppression'}`);
    }
  });
}