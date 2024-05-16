import { Exclude, Expose } from "class-transformer";

export class ProductDto {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    category: string;

    @Expose()
    price: string;

    @Expose()
    description: string;

    @Exclude()
    createdAt: string;

    @Exclude()
    updatedAt: string;
}