import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductDto } from './dto';

describe('ProductController', () => {
    let productController: ProductController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                {
                    provide: ProductService,
                    useValue: {
                        getAllProducts: () => {
                            return [];
                        }
                    }
                }],
        }).compile();

        productController = app.get<ProductController>(ProductController);
    });

    describe('root', () => {
        it('should return products', () => {
            expect(productController.getAll()).toBe([]);
        });
    });
});
