import { Controller, Get, Param } from '@nestjs/common';
import { ProductDto } from './dto';
import { ProductService } from './product.service';

@Controller("products")
export class ProductController {
    constructor(private readonly service: ProductService) { }

    @Get()
    getAll(): Promise<Array<ProductDto>> {
        return this.service.getAllProducts();
    }

    @Get(":id")
    getProductDetails(@Param('id') id: string): Promise<ProductDto> {
        return this.service.getProductById(parseInt(id));
    }
}
