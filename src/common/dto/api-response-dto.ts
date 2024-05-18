import { Expose } from "class-transformer";

export class ApiResponseDto {
    @Expose()
    status: boolean;

    @Expose()
    path: string;

    @Expose()
    statusCode: number;

    @Expose()
    result: any;
}