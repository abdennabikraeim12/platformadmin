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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrder(createOrderDto) {
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
    async getOrderById(id) {
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
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return this.mapToOrderResponseDto(order);
    }
    async getOrderStats() {
        const [dailyStats, weeklyStats, monthlyStats] = await Promise.all([
            this.getSalesStats('day'),
            this.getSalesStats('week'),
            this.getSalesStats('month'),
        ]);
        return { daily: dailyStats, weekly: weeklyStats, monthly: monthlyStats };
    }
    async getSalesStats(period) {
        return [];
    }
    mapToOrderResponseDto(order) {
        const items = order.items.map((item) => ({
            id: item.id,
            productId: item.productId,
            productName: item.product.name,
            quantity: item.quantity,
            price: item.price,
            total: item.quantity * item.price,
        }));
        const total = items.reduce((sum, item) => sum + item.total, 0);
        return {
            id: order.id,
            items,
            total,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map