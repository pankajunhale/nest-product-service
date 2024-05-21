import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";

export class AddCartItemDto {
    @Expose()
    productId: number;
}

export class AddCartItemResponseDto {
    @Expose()
    id: number;

    @Expose()
    shoppingCartId: number;

    @Expose()
    productId: number;

    @Expose()
    quantity: number;

    @Expose()
    totalCartItemCount: number;
}