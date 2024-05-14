import { Body, Controller, Post } from "@nestjs/common";
import { SignInDto } from "./dto/sing-in-dto";
import { AuthService } from "./auth.service";
import { Public } from "src/common/decorators/public.decorator";
import { SignInResponseDto } from "./dto/sign-in-response-dto";
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('sign-in')
    signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
        return this.authService.signIn(signInDto);
    }
}