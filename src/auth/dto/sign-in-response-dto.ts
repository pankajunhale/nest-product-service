import { Expose } from "class-transformer";

export class SignInResponseDto {
    @Expose()
    readonly accessToken: String
}