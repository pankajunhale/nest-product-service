import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req } from "@nestjs/common";
import { AddCartItemDto } from "./dto/add-cart-item-dto";
import { CartService } from "./cart.service";
import { ShoppingCartDto } from "./dto/shopping-cart-dto";
import { DtoValidationPipe } from "../../common/pipes/dto-validation";
import { REQ_USER_KEY } from "../../common/constants";
import { ActiveUserData } from "src/common/interfaces/active-user-data.interface";

@Controller("cart")
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    getAll(@Req() req: any): Promise<Array<ShoppingCartDto>> {
        const user: ActiveUserData = req[REQ_USER_KEY];
        return this.cartService.getMyShoppingCartInfo(parseInt(user.id));
    }

    @Get("info")
    getCartTotalAndItemCount(@Req() req: any): Promise<Array<ShoppingCartDto>> {
        const user: ActiveUserData = req[REQ_USER_KEY];
        return this.cartService.getCartTotalAndItemCountInfo(parseInt(user.id));
    }

    @Post()
    addItemToCart(@Body(new DtoValidationPipe()) dto: AddCartItemDto, @Req() req: any): Promise<any> {
        const user: ActiveUserData = req[REQ_USER_KEY];
        return this.cartService.addNewItem(dto, parseInt(user.id));
    }

    @Delete(":id/:shoppingCartId")
    removeCartItemFromCart(@Param('id', new ParseIntPipe()) id, @Param('shoppingCartId', new ParseIntPipe()) shoppingCartId): Promise<any> {
        return this.cartService.removeCartItem(shoppingCartId, id);
    }
}