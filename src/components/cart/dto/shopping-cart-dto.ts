import { Expose, Type } from "class-transformer";
import { IsNumber } from "class-validator";


class Product {
    @Expose()
    id: number

    @Expose()
    price: number

    @Expose()
    title: string;

    @Expose()
    description: string;
}

export class ShoppingCartDto {
    @Expose()
    id: number;

    @Expose()
    shoppingCartId: number;

    @Expose()
    productId: number;

    @Expose()
    userId: number;

    @IsNumber()
    @Expose()
    quantity: number;

    @Expose()
    itemTotal: number;

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

