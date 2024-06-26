import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './common/config/app.config';
import jwtConfig from './common/config/jwt.config';
import databaseConfig from './common/config/database.config';
import { APP_GUARD } from '@nestjs/core';
import { ProductModule } from './components/product/product.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/jwt-auth.guard';
import { CartModule } from './components/cart/cart.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { HealthModule } from './components/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig, databaseConfig],
    }),
    HealthModule,
    AuthModule,
    ProductModule,
    CartModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

}
