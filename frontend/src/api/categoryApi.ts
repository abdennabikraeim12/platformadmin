import type { Category } from "../types/category";
import { apiClient } from "./apiClient";

export const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await apiClient.get<Category[]>("/categories");
  return data;
};

