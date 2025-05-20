import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { SalesStatsDto } from './dto/sales-stats.dto';
import { StockStatsDto } from './dto/stock-stats.dto';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('sales')
  async getSalesStatistics(): Promise<SalesStatsDto> {
    return this.statisticsService.getSalesStatistics();
  }

  @Get('stock')
  async getStockStatistics(): Promise<StockStatsDto> {
    return this.statisticsService.getStockStatistics();
  }
}