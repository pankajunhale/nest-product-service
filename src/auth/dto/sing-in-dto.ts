import { Expose } from "class-transformer";

export class SignInDto {
    readonly email: string;
    readonly password: string;
}