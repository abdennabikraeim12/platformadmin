import { useQuery } from '@tanstack/react-query';
import type { Category } from '../types/category';
import { fetchCategories } from '../api/categoryApi';

export function useCategories() {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });
}
