
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, description, icon, trend }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <div>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </div>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center pt-1">
        {trend && (
          <span
            className={
              trend.isPositive ? "text-green-600 mr-2" : "text-red-600 mr-2"
            }
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
        )}
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </div>
    </CardContent>
  </Card>
);

interface StatsCardsProps {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  averageOrderValue: number;
  isLoading?: boolean;
}

const StatsCards = ({
  totalRevenue,
  totalOrders,
  totalProducts,
  averageOrderValue,
  isLoading = false,
}: StatsCardsProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-gray-100 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Chiffre d'affaires"
        value={formatCurrency(totalRevenue)}
        description="Mois en cours"
        trend={{ value: 12.5, isPositive: true }}
      />
      <StatCard
        title="Commandes"
        value={totalOrders}
        description="Mois en cours"
        trend={{ value: 8.2, isPositive: true }}
      />
      <StatCard
        title="Produits en catalogue"
        value={totalProducts}
      />
      <StatCard
        title="Panier moyen"
        value={formatCurrency(averageOrderValue)}
        trend={{ value: 3.1, isPositive: false }}
      />
    </div>
  );
};

export default StatsCards;
