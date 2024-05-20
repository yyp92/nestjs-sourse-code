import {
    ArrayContains,
    ArrayMaxSize,
    ArrayMinSize,
    ArrayNotContains,
    ArrayUnique,
    Contains,
    IsAlphanumeric,
    IsArray,
    IsBoolean,
    IsDateString,
    IsDefined,
    IsDivisibleBy,
    IsEmail,
    IsHexColor,
    IsIn,
    IsNotEmpty,
    IsNotIn,
    IsOptional,
    IsPositive,
    IsString,
    Length,
    Max,
    MaxLength,
    Min,
    MinLength,
    Validate,
    ValidateIf
} from "class-validator";
import { MyContains } from "src/my-contains.decorator";
import { MyValidator } from "src/my-validator";

export class CreateAaaDto {
    @IsNotEmpty({message: 'aaa 不能为空'})
    @IsString({message: 'aaa 必须是字符串'})
    @IsEmail({}, {message: 'aaa 必须是邮箱'})
    @IsOptional()

    // @IsIn 可以限制属性只能是某些值：
    // @IsIn(['aaa@aa.com', 'bbb@bb.com'])

    // @IsNotIn，可以限制属性不能是某些值：
    @IsNotIn(['aaa@aa.com', 'bbb@bb.com'])
    aaa: string;



    // @IsArray 可以限制属性是 array：
    @IsArray()
    // @ArrayContains 指定数组里必须包含的值：
    // @ArrayContains(['aaa'])
    // @ArrayNotContains 就是必须不包含的值。
    @ArrayNotContains(['aaa'])
    // @ArrayMinSize 和 @ArrayMaxSize 限制数组的长度。
    @ArrayMinSize(2)
    @ArrayMaxSize(5)
    // @ArrayUnique 限制数组元素必须唯一
    @ArrayUnique()
    bbb:string;



    // @IsNotEmpty 检查值是不是 ''、undefined、null。
    // @IsDefined 检查值是不是 undefined、null。
    // @IsDefined()
    @IsNotEmpty()
    ccc: string;



    // * 数字可以做更精准的校验：
    // @IsPositive 是必须是正数、@IsNegative 是必须是负数。
    // @Min、@Max 是限制范围。
    // @IsDivisibleBy 是必须被某个数整除。
    @IsPositive()
    @Min(1)
    @Max(10)
    @IsDivisibleBy(2)
    ddd:number; 
    
    

    // @IsDateString 是 ISO 标准的日期字符串：
    @IsDateString()
    eee: string;



    // * 几个字符串相关的：
    // @IsAlpha 检查是否只有字母
    // @IsAlphanumeric 检查是否只有字母和数字
    // @Contains 是否包含某个值
    @IsAlphanumeric()
    @Contains('aaa')
    fff: string;



    // 字符串可以通过 @MinLength、@MaxLength、@Length 来限制长度
    // @MinLength(2)
    // @MaxLength(6)
    @Length(2, 6)
    ggg: string;



    // 还可以校验颜色值的格式：@IsHexColor、@IsHSL、@IsRgbColor
    // 校验 IP 的格式：@IsIP
    // 校验端口： @IsPort
    // 校验 JSON 格式 @IsJSON



    // 此外，如果某个属性是否校验要根据别的属性的值呢
    // 如果 hhh 传了 true，那就需要对 iii 做校验，否则不需要
    @IsBoolean()
    hhh: boolean;

    @ValidateIf(o => o.hhh === true)
    @IsNotEmpty()
    @IsHexColor()
    iii: string;

    // @Validate(MyValidator, [11, 22], {
    //     message: 'jjj 校验失败',
    // })
    // jjj: string;
    @MyContains('111', {
        message: 'jjj 必须包含 111'
    })
    jjj: string;
}
