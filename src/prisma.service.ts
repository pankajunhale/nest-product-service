import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

    constructor() {
        super({
            log: ['query', 'info', 'warn', 'error'],
        })
    }
    async onModuleInit() {
        await this.$connect();
    }
}