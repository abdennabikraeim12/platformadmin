"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StatisticsService = class StatisticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSalesStatistics() {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const [orders, orderItems] = await Promise.all([
            this.prisma.order.findMany({
                where: { createdAt: { gte: thirtyDaysAgo } },
                include: { items: true },
            }),
            this.prisma.orderItem.groupBy({
                by: ['productId'],
                _sum: { quantity: true, price: true },
                orderBy: { _sum: { quantity: 'desc' } },
                take: 5,
            }),
        ]);
        const totalRevenue = orders.reduce((sum, order) => {
            return sum + order.items.reduce((orderSum, item) => orderSum + (item.price * item.quantity), 0);
        }, 0);
        const totalOrders = orders.length;
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
        const topSellingProducts = await Promise.all(orderItems.map(async (item) => {
            const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
            return {
                productId: item.productId,
                name: product?.name || 'Unknown',
                quantitySold: item._sum.quantity || 0,
                revenue: item._sum.price || 0,
            };
        }));
        return {
            period: 'Last 30 days',
            totalRevenue,
            totalOrders,
            averageOrderValue,
            topSellingProducts,
        };
    }
    async getStockStatistics() {
        const [products, categories] = await Promise.all([
            this.prisma.product.findMany({ include: { category: true } }),
            this.prisma.category.findMany(),
        ]);
        const totalProducts = products.length;
        const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
        const lowStockItems = products
            .filter((product) => product.stock > 0 && product.stock <= 10)
            .map((product) => ({
            productId: product.id,
            name: product.name,
            currentStock: product.stock,
        }));
        const outOfStockItems = products
            .filter((product) => product.stock === 0)
            .map((product) => ({
            productId: product.id,
            name: product.name,
        }));
        const byCategory = await Promise.all(categories.map(async (category) => {
            const categoryProducts = await this.prisma.product.findMany({
                where: { categoryId: category.id },
            });
            return {
                categoryId: category.id,
                name: category.name,
                productCount: categoryProducts.length,
                totalStock: categoryProducts.reduce((sum, product) => sum + product.stock, 0),
            };
        }));
        return {
            totalProducts,
            totalStock,
            lowStockItems,
            outOfStockItems,
            byCategory,
        };
    }
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map