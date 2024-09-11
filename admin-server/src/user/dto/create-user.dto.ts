import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, Matches } from "class-validator";

export class CreateUserDto {
    /**
     * 手机号（系统唯一）
     */
    @ApiProperty({example: '11111111222'})
    @Matches(/^1\d{10}$/g, {message: '请输入手机号'})
    readonly phoneNumber: string;

    @ApiProperty({example: '小明'})
    name: string;

    @ApiProperty({example: '222222'})
    // 是否为空
    @IsNotEmpty()
    @Length(6, 10)
    password: string;

    @ApiProperty({example: 'aa@qq.com'})
    email: string;
}
