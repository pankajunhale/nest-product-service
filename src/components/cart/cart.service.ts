import { ConflictException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CartDto } from "./dto/add-cart-item-dto";
import { plainToInstance } from "class-transformer";
import { ShoppingCartDto } from "./dto/shopping-cart-dto";


@Injectable()
export class CartService {

    constructor(
        private prismaService: PrismaService
    ) { }

    async addNewItem(cartDto: CartDto): Promise<CartDto> {
        let result: CartDto;
        const myCart = await this.getCart(cartDto.userId);

        if (!myCart) {
            const shoppingCart = await this.prismaService.shoppingCart.create(
                {
                    data: {
                        userId: cartDto.userId
                    }
                }
            );
            const cartItem = await this.prismaService.cartItem.create(
                {
                    data: {
                        shoppingCartId: shoppingCart.id,
                        productId: cartDto.productId,
                        quantity: cartDto.quantity
                    }
                }
            );
            result = Object.assign({}, shoppingCart, cartItem);
            console.log(result);
        }
        else {
            const isProductAlreadyExist = await this.isDuplicateProduct(cartDto, myCart.id);
            if (!isProductAlreadyExist) {
                const cartItem = await this.prismaService.cartItem.create(
                    {
                        data: {
                            shoppingCartId: myCart.id,
                            productId: cartDto.productId,
                            quantity: cartDto.userId
                        }
                    }
                );
                result = Object.assign({}, myCart, cartItem);
                console.log(result);
            }
            else {
                throw new ConflictException("Duplicate product", HttpStatus.CONFLICT.toString());
            }
        }
        return plainToInstance(CartDto, result);
    }

    public async getMyShoppingCartInfo(id: number): Promise<Array<ShoppingCartDto>> {
        const result = await this.prismaService.cartItem.findMany({
            where: {
                shoppingCartId: id
            },
            include: {
                product: true
            }
        });
        return plainToInstance(ShoppingCartDto, result);
    }

    public async removeCartItem(shoppingCartId: number, cartItemId: number): Promise<any> {
        const cartItem = await this.prismaService.cartItem.findFirst({
            where: {
                id: cartItemId,
                shoppingCartId: shoppingCartId
            }
        });
        if (!cartItem) {
            throw new NotFoundException("Cart item not found");
        }
        const result = await this.prismaService.cartItem.delete({
            where: {
                id: cartItemId
            }
        });
        console.log(result);
        return result;
    }

    private async isDuplicateProduct(cartDto: CartDto, id: number): Promise<boolean> {
        const result = await this.prismaService.cartItem.findFirst({
            where: {
                shoppingCartId: id,
                productId: cartDto.productId
            }
        });
        return result ? true : false;
    }

    private async getCart(id: number): Promise<{ id: number, userId: number }> {
        const result = await this.prismaService.shoppingCart.findFirst({
            where: {
                userId: id
            }
        });
        return result;
    }
}