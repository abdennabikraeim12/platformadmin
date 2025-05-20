import { useEffect, useState } from 'react';
import { Category } from '../../types/category';

interface ProductFilterProps {
  categories?: Category[];
  onFilterChange: (filters: any) => void;
}

export function ProductFilter({ categories, onFilterChange }: ProductFilterProps) {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');

  useEffect(() => {
    const filters: any = {};
    if (name) filters.name = name;
    if (categoryId) filters.categoryId = categoryId;
    onFilterChange(filters);
  }, [name, categoryId, onFilterChange]);

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : '')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Categories</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}