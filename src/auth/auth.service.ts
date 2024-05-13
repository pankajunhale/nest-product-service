import {
    BadRequestException,
    ConflictException,
    Inject,
    Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

import jwtConfig from '../common/config/jwt.config';
//import { MysqlErrorCode } from '../common/enums/error-codes.enum';
//import { ActiveUserData } from '../common/interfaces/active-user-data.interface';
import { BcryptService } from './bcrypt.service';
import { SignInDto } from './dto/sing-in-dto';
import { PrismaService } from '../prisma.service';
import { ActiveUserData } from '../common/interfaces/active-user-data.interface';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtService,
    ) { }

    async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
        const { email, password } = signInDto;

        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new BadRequestException('Invalid user name or password');
        }

        const isPasswordMatch = await this.bcryptService.compare(
            password,
            user.hashedPassword,
        );
        if (!isPasswordMatch) {
            throw new BadRequestException('Invalid user name or password');
        }

        return await this.generateAccessToken(user);
    }

    // async signOut(userId: string): Promise<void> {
    // }

    async generateAccessToken(
        user: Partial<{ id: number, email: string }>,
    ): Promise<{ accessToken: string }> {
        const tokenId = randomUUID();

        const accessToken = await this.jwtService.signAsync(
            {
                id: user.id.toString(),
                email: user.email,
                tokenId,
            } as ActiveUserData,
            {
                secret: this.jwtConfiguration.secret,
                expiresIn: this.jwtConfiguration.accessTokenTtl,
            },
        );

        return { accessToken };
    }
}