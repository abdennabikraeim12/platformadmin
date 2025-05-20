import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { OrderStatsDto } from './dto/order-stats.dto';
export declare class OrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOrder(createOrderDto: CreateOrderDto): Promise<OrderResponseDto>;
    getOrderById(id: number): Promise<OrderResponseDto>;
    getOrderStats(): Promise<OrderStatsDto>;
    private getSalesStats;
    private mapToOrderResponseDto;
}
