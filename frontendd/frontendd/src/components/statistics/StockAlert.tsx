
import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Product } from '@/types/product';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface StockAlertProps {
  products: Product[];
  monthlySalesData: Record<number, number>; // Product ID -> average monthly sales
  isLoading: boolean;
}

const StockAlert = ({ products, monthlySalesData, isLoading }: StockAlertProps) => {
  const alertProducts = useMemo(() => {
    if (!products || !monthlySalesData) return [];
    
    return products
      .map(product => {
        const avgMonthlySales = monthlySalesData[product.id] || 0;
        const missing = Math.max(0, avgMonthlySales - product.stock);
        return {
          ...product,
          avgMonthlySales,
          missing,
        };
      })
      .filter(p => p.missing > 0)
      .sort((a, b) => b.missing - a.missing);
  }, [products, monthlySalesData]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Alertes de stock</CardTitle>
          <CardDescription>
            Produits dont le stock est inférieur aux ventes mensuelles moyennes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-md" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertes de stock</CardTitle>
        <CardDescription>
          Produits dont le stock est inférieur aux ventes mensuelles moyennes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {alertProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            Aucune alerte de stock pour le moment
          </p>
        ) : (
          alertProducts.map(product => (
            <Alert key={product.id} variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{product.name}</AlertTitle>
              <AlertDescription>
                {product.missing} {product.missing > 1 ? 'unités manquantes' : 'unité manquante'} 
                {' '}(Stock actuel: {product.stock}, Ventes mensuelles: {product.avgMonthlySales})
              </AlertDescription>
            </Alert>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default StockAlert;
