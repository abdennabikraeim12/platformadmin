
// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

// Sort options for product table
export const SORT_OPTIONS = [
  { label: 'Nom (A-Z)', value: 'name-asc' },
  { label: 'Nom (Z-A)', value: 'name-desc' },
  { label: 'Stock (croissant)', value: 'stock-asc' },
  { label: 'Stock (décroissant)', value: 'stock-desc' },
  { label: 'Catégorie (A-Z)', value: 'category-asc' },
  { label: 'Meilleures ventes', value: 'orderCount-desc' },
];

// Chart colors
export const CHART_COLORS = [
  '#4f46e5', // Primary
  '#8b5cf6', 
  '#d946ef',
  '#ec4899',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#6366f1',
];

// Mock data for development (will be removed when backend is ready)
export const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

// Stock alert threshold ratio (when stock is below this percentage of average monthly sales)
export const STOCK_ALERT_THRESHOLD = 1; // Stock should be at least equal to 1 month of sales
