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
    // Start transaction to ensure data consistency
    const order = await this.prisma.$transaction(async (prisma) => {
      // Create the order
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

      // Update product stock
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
