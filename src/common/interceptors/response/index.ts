import { CallHandler, ExecutionContext, HttpException, HttpStatus, NestInterceptor } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Observable, catchError, map, throwError } from "rxjs";
import { ApiResponseDto } from "../../../common/dto/api-response-dto";

export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((res) => this.appResponseHandler(res, context)),
            catchError((err: HttpException) => throwError(() => this.appErrorHandler(context, err)))
        )
    }

    appResponseHandler(res: any, context: ExecutionContext) {
        const response = context.switchToHttp().getResponse();
        const request = context.switchToHttp().getRequest();
        const statusCode = response.statusCode;

        const data = {
            status: true,
            path: request.url,
            statusCode,
            result: res,
        };
        const result = plainToInstance(ApiResponseDto, data);
        return result;
    }

    appErrorHandler(context: ExecutionContext, exception: unknown) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        response.status(status).json({
            status: false,
            statusCode: status,
            path: request.url,
            message: exception['message'],
        });
    }

}