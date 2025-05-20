import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { OrderStatsDto } from './dto/order-stats.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<OrderResponseDto>;
    findOne(id: string): Promise<OrderResponseDto>;
    getStats(): Promise<OrderStatsDto>;
}
