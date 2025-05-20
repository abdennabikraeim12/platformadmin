import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  price: z.number().min(0.01, 'Le prix doit être supérieur à 0'),
  stock: z.number().min(0, 'Le stock ne peut pas être négatif'),
  categoryId: z.number().min(1, 'Veuillez sélectionner une catégorie'),
  description: z.string().optional()
});

export type ProductFormValues = z.infer<typeof productSchema>;