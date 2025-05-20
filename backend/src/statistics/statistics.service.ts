import { Injectable } from '@nestjs/common';
import { Order, OrderItem, Product, Category } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { SalesStatsDto } from './dto/sales-stats.dto';
import { StockStatsDto } from './dto/stock-stats.dto';

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSalesStatistics(): Promise<SalesStatsDto> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [orders, orderItems] = await Promise.all([
      this.prisma.order.findMany({
        where: { createdAt: { gte: thirtyDaysAgo } },
        include: { items: true },
      }) as Promise<(Order & { items: OrderItem[] })[]>,
      
      this.prisma.orderItem.groupBy({
        by: ['productId'],
        _sum: { quantity: true, price: true },
        orderBy: { _sum: { quantity: 'desc' } },
        take: 5,
      }),
    ]);

    const totalRevenue = orders.reduce((sum: number, order: Order & { items: OrderItem[] }) => {
      return sum + order.items.reduce((orderSum: number, item: OrderItem) => orderSum + (item.price * item.quantity), 0);
    }, 0);

    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const topSellingProducts = await Promise.all(
      orderItems.map(async (item: { productId: number; _sum: { quantity: number; price: number } }) => {
        const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
        return {
          productId: item.productId,
          name: product?.name || 'Unknown',
          quantitySold: item._sum.quantity || 0,
          revenue: item._sum.price || 0,
        };
      })
    );

    return {
      period: 'Last 30 days',
      totalRevenue,
      totalOrders,
      averageOrderValue,
      topSellingProducts,
    };
  }

  async getStockStatistics(): Promise<StockStatsDto> {
    const [products, categories] = await Promise.all([
      this.prisma.product.findMany({ include: { category: true } }) as Promise<(Product & { category: Category })[]>,
      this.prisma.category.findMany() as Promise<Category[]>,
    ]);

    const totalProducts = products.length;

    const totalStock = products.reduce((sum: number, product: Product) => sum + product.stock, 0);

    const lowStockItems = products
      .filter((product: Product) => product.stock > 0 && product.stock <= 10)
      .map((product: Product) => ({
        productId: product.id,
        name: product.name,
        currentStock: product.stock,
      }));

    const outOfStockItems = products
      .filter((product: Product) => product.stock === 0)
      .map((product: Product) => ({
        productId: product.id,
        name: product.name,
      }));

    const byCategory = await Promise.all(
      categories.map(async (category: Category) => {
        const categoryProducts = await this.prisma.product.findMany({
          where: { categoryId: category.id },
        }) as Product[];

        return {
          categoryId: category.id,
          name: category.name,
          productCount: categoryProducts.length,
          totalStock: categoryProducts.reduce((sum: number, product: Product) => sum + product.stock, 0),
        };
      })
    );

    return {
      totalProducts,
      totalStock,
      lowStockItems,
      outOfStockItems,
      byCategory,
    };
  }
}
