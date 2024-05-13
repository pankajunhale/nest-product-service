import { Body, Controller, Post } from "@nestjs/common";
import { SignInDto } from "./dto/sing-in-dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('sign-in')
    signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(signInDto);
    }
}