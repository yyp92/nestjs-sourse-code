import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    MinLength
} from "class-validator";
import { RegisterUserDto } from './register-user.dto';

export class UpdateUserPasswordDto extends PickType(RegisterUserDto, ['email', 'captcha', 'username', 'password']) {}

// export class UpdateUserPasswordDto {  
//     @IsNotEmpty({
//         message: '用户名不能为空'
//     })
//     @ApiProperty()
//     username: string;
      
//     @IsNotEmpty({
//         message: '密码不能为空'
//     })
//     @MinLength(
//         6,
//         {
//             message: '密码不能少于 6 位'
//         }
//     )
//     @ApiProperty()
//     password: string;
    
//     @IsNotEmpty({
//         message: '邮箱不能为空'
//     })
//     @IsEmail(
//         {},
//         {
//             message: '不是合法的邮箱格式'
//         }
//     )
//     @ApiProperty()
//     email: string;
    
//     @IsNotEmpty({
//         message: '验证码不能为空'
//     })
//     @ApiProperty()
//     captcha: string;
// }
