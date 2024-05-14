import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IProductService } from './interface';
import { ProductDto } from './dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductService implements IProductService {

    constructor(private prisma: PrismaService) { }

    async getAllProducts(): Promise<Array<ProductDto>> {
        const products = await this.prisma.product.findMany();
        return plainToInstance(ProductDto, products);
    }

    async getProductById(id: number): Promise<ProductDto> {
        const result = await this.prisma.product.findUniqueOrThrow({
            where: {
                id
            }
        });
        return plainToInstance(ProductDto, result);
    }
}
