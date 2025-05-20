import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { StatisticsModule } from './statistics/statistics.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    StatisticsModule,
  ],
})
export class AppModule {}