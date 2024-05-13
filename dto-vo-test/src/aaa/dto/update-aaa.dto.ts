import { PartialType, PickType, OmitType, IntersectionType  } from '@nestjs/mapped-types';
import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    Length,
    MaxLength,
    MinLength
} from "class-validator";
import { XxxDto } from './xxx.dto';
import { CreateAaaDto } from './create-aaa.dto';


// 然后两者合并
export class UpdateAaaDto extends IntersectionType(
    // 从 CreateAaaDto 里拿出 name 和 age 属性
    PickType(CreateAaaDto, ['name', 'age']), 

    // 从 XxxDto 里去掉 yyy 属性变为可选
    PartialType(OmitType(XxxDto, ['yyy']))
) {

}


// export class UpdateAaaDto extends IntersectionType(CreateAaaDto, XxxDto) {

// }


// OmitType 是从中去掉几个取剩下的
// export class UpdateAaaDto extends OmitType(CreateAaaDto, ['name', 'hoobies', 'sex']) {

// }

// PickType 是从中挑选几个
// export class UpdateAaaDto extends PickType(CreateAaaDto, ['age', 'email']) {

// }


// export class UpdateAaaDto extends PartialType(CreateAaaDto) {
//     // name: string;

//     // age: number;

//     // sex: boolean;

//     // email: string;

//     // hoobies: string[]
// }


// export class UpdateAaaDto extends CreateAaaDto {
// }


// export class UpdateAaaDto  {
//     @IsNotEmpty()
//     @MinLength(4)
//     @MaxLength(20)
//     name: string;

//     @IsNotEmpty()
//     @IsNumber()
//     age: number;

//     @IsNotEmpty()
//     @IsBoolean()
//     sex: boolean;

//     @IsNotEmpty()
//     @IsEmail()
//     email: string;

//     hoobies: string[]
// }
