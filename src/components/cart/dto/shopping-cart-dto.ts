import { Expose, Type } from "class-transformer";
import { IsNumber } from "class-validator";


class Product {
    @Expose()
    id: number

    @Expose()
    price: number
}

export class ShoppingCartDto {
    @Expose()
    id: number;

    @Expose()
    userId: number;

    @Expose()
    productId: number;

    @IsNumber()
    @Expose()
    quantity: number;

    @Expose()
    price: number;

    @Expose()
    @Type(() => Product)
    product: Product;

    // id          Int @id @default(autoincrement()) 
    // user        User @relation(fields: [userId], references: [id])
    // userId      Int @unique
    // product     Product @relation(fields: [productId], references: [id])
    // productId   Int @unique
    // quantity    Int
    // createdAt   DateTime @default(now())
    // updatedAt   DateTime?
}

