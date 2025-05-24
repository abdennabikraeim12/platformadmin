import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { OrderStatsDto, SalesStatsDto } from './dto/order-stats.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    return this.ordersService.createOrder(createOrderDto);
  }
   @Get()
    findAll(): Promise<OrderResponseDto[]> {
      return this.ordersService.findAll();
    }
    @Get('monthly-sales')
async getMonthlySales(@Query('year') year: string): Promise<SalesStatsDto[]> {
  return this.ordersService.getMonthlySales(+year);
}
  @Get('stats')
  async getStats(): Promise<OrderStatsDto> {
    return this.ordersService.getOrderStats();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderResponseDto> {
    return this.ordersService.getOrderById(+id);
  }

  
}
