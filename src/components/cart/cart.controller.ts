import { Body, Controller, Delete, Get, Param, Post, Req } from "@nestjs/common";
import { CartDto } from "./dto/add-cart-item-dto";
import { CartService } from "./cart.service";
import { ShoppingCartDto } from "./dto/shopping-cart-dto";

@Controller("carts")
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get(":id")
    getAll(@Param() params: any): Promise<Array<ShoppingCartDto>> {
        return this.cartService.getMyShoppingCartInfo(parseInt(params.id));
    }

    @Post()
    addItemToCart(@Body() dto): Promise<CartDto> {
        return this.cartService.addNewItem(dto);
    }

    @Delete(":id/:shoppingCartId")
    removeCartItemFromCart(@Param() params: { id: string, shoppingCartId: string }): Promise<any> {
        return this.cartService.removeCartItem(parseInt(params.shoppingCartId), parseInt(params.id));
    }
}