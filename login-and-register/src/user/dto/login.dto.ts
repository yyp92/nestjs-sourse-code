import { IsNotEmpty } from "class-validator";

// 登录就不用限制了，只要不为空就行
export class LoginDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}
