import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { BcryptService } from "./bcrypt.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import jwtConfig from "../common/config/jwt.config";

@Module({
    imports: [
        JwtModule.registerAsync(jwtConfig.asProvider()),
    ],
    controllers: [AuthController],
    providers: [
        PrismaService,
        AuthService,
        BcryptService,
        JwtService
    ],
    exports: [
        JwtModule
    ]
})
export class AuthModule { }