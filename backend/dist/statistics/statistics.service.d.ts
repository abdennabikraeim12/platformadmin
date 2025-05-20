import { PrismaService } from 'prisma/prisma.service';
import { SalesStatsDto } from './dto/sales-stats.dto';
import { StockStatsDto } from './dto/stock-stats.dto';
export declare class StatisticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getSalesStatistics(): Promise<SalesStatsDto>;
    getStockStatistics(): Promise<StockStatsDto>;
}
