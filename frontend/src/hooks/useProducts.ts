import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductApi } from '../api/productApi';
import { Product, ProductFilterParams, UpdateProductDto } from '../types/product';

export const useProducts = (params?: ProductFilterParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => ProductApi.getAll(params),
    keepPreviousData: true,
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductApi.getById(id),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(ProductApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, data }: { id: number; data: UpdateProductDto }) => 
      ProductApi.update(id, data),
    {
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries(['products']);
        queryClient.invalidateQueries(['product', id]);
      },
    }
  );
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(ProductApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });
};