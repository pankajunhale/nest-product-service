import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IProductService } from './interface';
import { ProductDto } from './dto';

@Injectable()
export class ProductService implements IProductService {

    constructor(private prisma: PrismaService) { }

    async getAllProducts(): Promise<Array<ProductDto>> {
        const result = await this.prisma.product.findMany();
        console.log(result);
        return [];
    }

    async getProductById(id: number): Promise<ProductDto> {
        const result = await this.prisma.product.findUnique({
            where: {
                id
            }
        });
        console.log(result);
        return new ProductDto();
    }
}
