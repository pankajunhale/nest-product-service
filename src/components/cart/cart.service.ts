import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { AddCartItemDto, AddCartItemResponseDto } from "./dto/add-cart-item-dto";
import { plainToInstance } from "class-transformer";
import { ShoppingCartDto } from "./dto/shopping-cart-dto";
import { CartTotalAndItemCountDto } from "./dto/cart-total-and-item-count-dto";
@Injectable()
export class CartService {

    constructor(
        private prismaService: PrismaService
    ) { }

    async addNewItem(cartDto: AddCartItemDto, userId: number): Promise<AddCartItemResponseDto> {
        let result: any;
        const myCart = await this.getCart(userId);
        const QUANTITY = 1;
        if (!myCart) {
            console.log('Create brand new cart for user...');
            const shoppingCart = await this.prismaService.shoppingCart.create(
                {
                    data: {
                        userId: userId
                    }
                }
            );
            console.log('add new item to cart...');
            const cartItem = await this.prismaService.cartItem.create(
                {
                    data: {
                        shoppingCartId: shoppingCart.id,
                        productId: cartDto.productId,
                        quantity: QUANTITY
                    }
                }
            );
            result = Object.assign({}, shoppingCart, cartItem, { totalCartItemCount: QUANTITY });
            console.log(result);
            return plainToInstance(AddCartItemResponseDto, result);
        }
        else {
            console.log('Process started to validate duplicate product');
            const isProductAlreadyExist = await this.isDuplicateProduct(cartDto, myCart.id);
            console.log(`isProductAlreadyExist:${isProductAlreadyExist}`);
            if (!isProductAlreadyExist) {
                console.log('Product not exist in the cart, add new one');
                const cartItem = await this.prismaService.cartItem.create(
                    {
                        data: {
                            shoppingCartId: myCart.id,
                            productId: cartDto.productId,
                            quantity: QUANTITY
                        }
                    }
                );
                const cartItemCount = await this.getCartItemCount(myCart.id);
                result = Object.assign({}, myCart, cartItem, { totalCartItemCount: cartItemCount });
                console.log(result);
                return plainToInstance(AddCartItemResponseDto, result);
            }
            else {
                console.log('Product exist in the cart, updating cart quantity');
                const oldCartItem = await this.prismaService.cartItem.findFirst({
                    where: {
                        productId: cartDto.productId
                    }
                });
                const updatedCartItem = await this.prismaService.cartItem.update({
                    data: {
                        quantity: (oldCartItem.quantity + 1)
                    },
                    where: {
                        productId: cartDto.productId
                    }
                });
                const cartItemCount = await this.getCartItemCount(oldCartItem.shoppingCartId);
                const total = await this.getCartItemTotal(oldCartItem.shoppingCartId);
                console.log(total);
                result = Object.assign({}, myCart, updatedCartItem, { totalCartItemCount: cartItemCount });
                console.log(result);
                return plainToInstance(AddCartItemResponseDto, result);
            }
        }
    }

    public async getMyShoppingCartInfo(id: number): Promise<Array<ShoppingCartDto>> {
        const shoppingCart = await this.prismaService.shoppingCart.findFirst(
            {
                where: {
                    userId: id
                }
            }
        )
        if (shoppingCart) {
            const result = await this.prismaService.cartItem.findMany({
                where: {
                    shoppingCartId: shoppingCart.id
                },
                include: {
                    product: true
                }
            });
            console.log(result);
            return plainToInstance(ShoppingCartDto, result);
        }
        return plainToInstance(ShoppingCartDto, []);
    }

    // tbd
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

    public async getCartTotalAndItemCountInfo(userId: number): Promise<any> {
        let count = 0;
        let total = 0;
        const myCart = await this.getCart(userId);
        if (myCart) {
            count = await this.getCartItemCount(myCart.id);
            total = await this.getCartItemTotal(myCart.id);
        }
        console.log({ total, count });
        return plainToInstance(CartTotalAndItemCountDto, { total, count });
    }

    private async isDuplicateProduct(cartDto: AddCartItemDto, id: number): Promise<boolean> {
        const result = await this.prismaService.cartItem.findFirst({
            where: {
                shoppingCartId: id,
                productId: cartDto.productId
            }
        });
        return result ? true : false;
    }

    private async getCart(userId: number): Promise<{ id: number, userId: number }> {
        const result = await this.prismaService.shoppingCart.findFirst({
            where: {
                userId: userId
            }
        });
        return result;
    }

    private async getCartItemCount(shoppingCartId: number): Promise<number> {
        let count = 0;
        const cartItems = await this.prismaService.cartItem.findMany({
            where: {
                shoppingCartId: shoppingCartId
            }
        });
        cartItems.map((item) => {
            count = count + item.quantity;
        });
        console.log({ cartItemCount: count });
        return count;
    }

    private async getCartItemTotal(shoppingCartId: number): Promise<number> {
        let total = 0;
        const cartItems = await this.prismaService.cartItem.findMany({
            where: {
                shoppingCartId: shoppingCartId
            },
            include: {
                product: true
            }
        });
        if (cartItems.length > 0) {
            // cartItems.map((item) => {
            //     const qty = item.quantity;
            //     const price = item.product.price;
            //     total = total + (qty * price);
            // });
            const initialTotal = 0;
            total = cartItems.reduce((accumulator, currentVal) => {
                return accumulator + (currentVal.quantity * currentVal.product.price)
            }, initialTotal);
            console.log({ cartItemTotal: total });
        }
        return total;
    }
}