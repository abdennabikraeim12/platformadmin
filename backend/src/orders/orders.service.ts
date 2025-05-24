import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { OrderStatsDto, SalesStatsDto } from './dto/order-stats.dto';
import { Order, OrderItem, Product } from '@prisma/client';

type OrderWithItems = Order & {
  items: Array<OrderItem & { product: Product }>;
};

interface OrderItemResponse {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    const order = await this.prisma.$transaction(async (prisma) => {
      const newOrder = await prisma.order.create({
        data: {
          items: {
            create: createOrderDto.items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      for (const item of createOrderDto.items) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return newOrder;
    });

    return this.mapToOrderResponseDto(order);
  }
 async findAll(): Promise<OrderResponseDto[]> {
  const orders = await this.prisma.order.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
  
  return orders.map(order => this.mapToOrderResponseDto(order));
}
  async getOrderById(id: number): Promise<OrderResponseDto> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return this.mapToOrderResponseDto(order);
  }
async getMonthlySales(year: number): Promise<SalesStatsDto[]> {
  // Define interfaces for the raw query results
  interface MonthlySalesResult {
    month: number;
    orderCount: bigint;
    totalSales: number | null;
  }

  interface TopProductResult {
    month: number;
    productId: number;
    productName: string;
    sales: number | null;
  }

  // 1. Query for monthly statistics (calculate total from order items)
  const monthlySales = await this.prisma.$queryRaw<MonthlySalesResult[]>`
    SELECT 
      EXTRACT(MONTH FROM o."createdAt") as month,
      COUNT(DISTINCT o.id) as "orderCount",
      SUM(oi.quantity * oi.price) as "totalSales"
    FROM "Order" o
    JOIN "OrderItem" oi ON o.id = oi."orderId"
    WHERE EXTRACT(YEAR FROM o."createdAt") = ${year}
    GROUP BY EXTRACT(MONTH FROM o."createdAt")
    ORDER BY month
  `;

  // 2. Query for top products (same as before)
  const topProducts = await this.prisma.$queryRaw<TopProductResult[]>`
    WITH monthly_products AS (
      SELECT 
        EXTRACT(MONTH FROM o."createdAt") as month,
        p.id as "productId",
        p.name as "productName",
        SUM(oi.quantity * oi.price) as sales
      FROM "Order" o
      JOIN "OrderItem" oi ON o.id = oi."orderId"
      JOIN "Product" p ON oi."productId" = p.id
      WHERE EXTRACT(YEAR FROM o."createdAt") = ${year}
      GROUP BY month, p.id, p.name
    ),
    ranked_products AS (
      SELECT 
        month,
        "productId",
        "productName",
        sales,
        ROW_NUMBER() OVER (PARTITION BY month ORDER BY sales DESC) as rank
      FROM monthly_products
    )
    SELECT month, "productId", "productName", sales
    FROM ranked_products
    WHERE rank <= 3
    ORDER BY month, rank
  `;

  // 3. Map results to DTO
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];

  return monthNames.map((monthName, index) => {
    const monthData = monthlySales.find(m => m.month === index + 1);
    const productsForMonth = topProducts
      .filter(p => p.month === index + 1)
      .map(p => ({
        productId: p.productId,
        name: p.productName,
        sales: Number(p.sales || 0)
      }));

    return {
      period: monthName,
      totalSales: monthData ? Number(monthData.totalSales || 0) : 0,
      orderCount: monthData ? Number(monthData.orderCount) : 0,
      topProducts: productsForMonth
    };
  });
}

  async getOrderStats(): Promise<OrderStatsDto> {
    const [dailyStats, weeklyStats, monthlyStats] = await Promise.all([
      this.getSalesStats('day'),
      this.getSalesStats('week'),
      this.getSalesStats('month'),
    ]);

    return { daily: dailyStats, weekly: weeklyStats, monthly: monthlyStats };
  }

  private async getSalesStats(period: 'day' | 'week' | 'month'): Promise<SalesStatsDto[]> {
    return [];
  }

 private mapToOrderResponseDto(order: OrderWithItems): OrderResponseDto {
  const items: OrderItemResponse[] = order.items.map((item: OrderItem & { product: Product }) => ({
    id: item.id,
    productId: item.productId,
    productName: item.product.name,
    quantity: item.quantity,
    price: item.price,
    total: item.quantity * item.price,
  }));

  const total: number = items.reduce((sum, item) => sum + item.total, 0);

  return {
    id: order.id,
    items,
    total,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
}

}
