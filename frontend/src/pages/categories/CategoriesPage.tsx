import { useCategories } from '../../hooks/useCategories';
import { Category } from '../../types/category';

export function CategoriesPage() {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <ul className="space-y-2">
        {categories?.map((category: Category) => (
          <li key={category.id} className="border p-2 rounded">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
