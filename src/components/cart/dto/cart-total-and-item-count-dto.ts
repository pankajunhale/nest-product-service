import { Expose } from "class-transformer";

export class CartTotalAndItemCountDto {
    @Expose()
    total: number;

    @Expose()
    count: number;
}