import { StatisticsService } from './statistics.service';
import { SalesStatsDto } from './dto/sales-stats.dto';
import { StockStatsDto } from './dto/stock-stats.dto';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    getSalesStatistics(): Promise<SalesStatsDto>;
    getStockStatistics(): Promise<StockStatsDto>;
}
