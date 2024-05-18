import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";

export class AddCartItemDto {
    @Expose()
    id: number;

    @Expose()
    userId: number;

    @Expose()
    productId: number;

    @IsNumber()
    @Expose()
    quantity: number;
}