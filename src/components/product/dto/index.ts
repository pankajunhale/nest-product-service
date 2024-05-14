import { Exclude, Expose } from "class-transformer";
import { IsDecimal } from "class-validator";

export class ProductDto {
    @Expose()
    Id: number;

    @Expose()
    title: string;

    @Expose()
    category: string;

    //@IsDecimal({ decimal_digits: '0' })
    @Expose()
    price: string;

    @Expose()
    description: string;

    @Exclude()
    createdAt: string;

    @Exclude()
    updatedAt: string;
    // category: 'product-category-29',
    // image: null,
    // createdAt: 2024-05 - 13T15: 28: 34.700Z,
    //     updatedAt: null
}