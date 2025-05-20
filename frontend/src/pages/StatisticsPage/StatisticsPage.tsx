import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSalesStats, useStockStats } from '../../hooks/useStatistics';

export function StatisticsPage() {
  const { data: salesStats, isLoading: salesLoading, error: salesError } = useSalesStats();
  const { data: stockStats, isLoading: stockLoading, error: stockError } = useStockStats();

  if (salesLoading || stockLoading) return <p>Chargement des statistiques...</p>;
  if (salesError || stockError) return <p>Erreur lors du chargement des statistiques</p>;

  const salesData = {
    labels: salesStats?.map(s => s.month) || [],
    datasets: [
      {
        label: 'Ventes mensuelles',
        data: salesStats?.map(s => s.sales) || [],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  const stockData = {
    labels: stockStats?.map(s => s.categoryId) || [],
    datasets: [
      {
        label: 'Stock par catégorie',
        data: stockStats?.map(s => s.stock) || [],
        backgroundColor: 'rgba(153,102,255,0.6)',
      },
    ],
  };

  return (
    <div>
      <h1>Statistiques des ventes</h1>
      <Line data={salesData} />

      <h1>Statistiques du stock</h1>
      <Line data={stockData} />
    </div>
  );
}
