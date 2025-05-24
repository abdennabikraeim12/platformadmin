
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import LineChart from '@/components/common/Charts/LineChart';
import PieChart from '@/components/common/Charts/PieChart';
import StatsCards from '@/components/statistics/StatsCards';
import StockAlert from '@/components/statistics/StockAlert';
import { useMonthlySales } from '@/hooks/useOrders';
import { useProducts } from '@/hooks/useProducts';
import { useCategoryStockDistribution } from '@/hooks/useCategories';
import { MONTHS } from '@/utils/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';

const StatisticsPage = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  const { data: monthlySalesData, isLoading: loadingMonthlySales } = useMonthlySales(parseInt(selectedYear));

  const { data: categoryStockData, isLoading: loadingCategoryStock } = useCategoryStockDistribution();
  
  const { data: productsData, isLoading: loadingProducts } = useProducts({
    page: 1,
    limit: 100, 
  });

  const products = productsData?.data || [];

  const lineChartData = monthlySalesData?.map((item) => ({
    month: MONTHS[new Date(`${selectedYear}-${item.month}-01`).getMonth()],
    ...item.sales,
  })) || [];

  const pieChartData = categoryStockData?.map((item) => ({
    name: item.categoryName,
    value: item.stockCount,
  })) || [];

 const avgMonthlySales = monthlySalesData?.reduce((acc, month) => {
  if (month?.sales) {  
    Object.entries(month.sales).forEach(([productId, sales]) => {
      const id = parseInt(productId);
      acc[id] = (acc[id] || 0) + sales;
    });
  }
  return acc;
}, {} as Record<number, number>) || {};  

  Object.keys(avgMonthlySales || {}).forEach(key => {
    const id = parseInt(key);
    avgMonthlySales![id] = avgMonthlySales![id] / 12;
  });

  const statsData = {
    totalRevenue: 12458.75,
    totalOrders: 142,
    totalProducts: products.length,
    averageOrderValue: 87.74,
  };

  const years = Array.from({ length: 5 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { label: year.toString(), value: year.toString() };
  });

  const topProducts = products
    .sort((a, b) => b.orderCount - a.orderCount)
    .slice(0, 5);

  const productLabels = topProducts.reduce((acc, product) => {
    acc[product.id] = product.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Statistiques</h1>
          <p className="text-muted-foreground">
            Visualisez les performances de votre catalogue de produits et identifiez les opportunités d'amélioration.
          </p>
        </div>

        <StatsCards
          totalRevenue={statsData.totalRevenue}
          totalOrders={statsData.totalOrders}
          totalProducts={statsData.totalProducts}
          averageOrderValue={statsData.averageOrderValue}
          isLoading={loadingProducts}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Ventes mensuelles par produit</h2>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Année" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <LineChart
              data={lineChartData}
              xKey="month"
              yKeys={topProducts.map(p => p.id.toString())}
              yLabels={productLabels}
              height={350}
            />
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Répartition du stock par catégorie</h2>
            <PieChart 
              data={pieChartData}
              height={350}
            />
          </Card>
        </div>

        <StockAlert 
          products={products}
          monthlySalesData={avgMonthlySales || {}}
          isLoading={loadingProducts || loadingMonthlySales}
        />
      </div>
    </Layout>
  );
};

export default StatisticsPage;
