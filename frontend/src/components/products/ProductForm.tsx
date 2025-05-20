import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProductDto, UpdateProductDto } from '../../types/product';
import { useCategories } from '../../hooks/useCategories';
import { productSchema } from '../../utils/validators/roduct.schema';

interface ProductFormProps {
  initialData?: CreateProductDto | UpdateProductDto;
  onSubmit: (data: CreateProductDto | UpdateProductDto) => void;
  isSubmitting?: boolean;
  onCancel?: () => void;
}

export function ProductForm({
  initialData,
  onSubmit,
  isSubmitting,
  onCancel
}: ProductFormProps) {
  const { data: categories } = useCategories();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateProductDto | UpdateProductDto>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name">Nom du produit</label>
        <input
          id="name"
          {...register('name')}
          className="input"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="price">Prix (€)</label>
        <input
          id="price"
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
          className="input"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          type="number"
          {...register('stock', { valueAsNumber: true })}
          className="input"
        />
        {errors.stock && (
          <p className="text-red-500 text-sm">{errors.stock.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="categoryId">Catégorie</label>
        <select
          id="categoryId"
          {...register('categoryId', { valueAsNumber: true })}
          className="select"
        >
          <option value="">Sélectionner une catégorie</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register('description')}
          className="textarea"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Annuler
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>
    </form>
  );
}