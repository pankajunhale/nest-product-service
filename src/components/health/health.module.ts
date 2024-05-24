import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health.controller';

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [HealthController],
    providers: [],
})
export class HealthModule {}
