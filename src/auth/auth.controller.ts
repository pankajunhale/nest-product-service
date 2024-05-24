import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { SignInDto } from "./dto/sing-in-dto";
import { AuthService } from "./auth.service";
import { Public } from "../common/decorators/public.decorator";
import { SignInResponseDto } from "./dto/sign-in-response-dto";
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('sign-in')
    signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
        return this.authService.signIn(signInDto);
    }
}