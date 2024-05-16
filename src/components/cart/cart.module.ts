import { Module } from "@nestjs/common";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { ProductService } from "../product/product.service";
import { PrismaService } from "../../prisma.service";

@Module({
    controllers: [CartController],
    providers: [
        CartService,
        PrismaService,
        ProductService
    ]
})
export class CartModule { }