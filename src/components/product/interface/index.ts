import { ProductDto } from "../dto";

export interface IProductService {
    getAllProducts: () => Promise<Array<ProductDto>>;
    getProductById: (id: number) => Promise<ProductDto>;
}