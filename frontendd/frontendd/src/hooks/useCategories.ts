
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryApi } from '../api/categoryApi';
import { Category } from '../types/category';
import { toast } from 'sonner';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getCategories(),
  });
}

export function useCategory(id: number) {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoryApi.getCategory(id),
    enabled: !!id, 
  });
}

export function useCategoryStockDistribution() {
  return useQuery({
    queryKey: ['categories', 'stockDistribution'],
    queryFn: () => categoryApi.getCategoryStockDistribution(),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCategory: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => 
      categoryApi.createCategory(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Catégorie créée avec succès !');
    },
    onError: (error) => {
      console.error('Error creating category:', error);
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, category }: { id: number; category: Partial<Category> }) => 
      categoryApi.updateCategory(id, category),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', data.id] });
      toast.success('Catégorie mise à jour avec succès !');
    },
    onError: (error) => {
      console.error('Error updating category:', error);
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => categoryApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Catégorie supprimée avec succès !');
    },
    onError: (error) => {
      console.error('Error deleting category:', error);
    },
  });
}
