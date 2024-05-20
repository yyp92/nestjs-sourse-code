import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";


// 用 @ValidatorConstraint 声明 class 为校验规则
@ValidatorConstraint()
// 然后实现 ValidatorConstraintInterface 接口
export class MyValidator implements ValidatorConstraintInterface {
    validate(text: string, validationArguments: ValidationArguments) {
        console.log(text, validationArguments)

        // return true;
        // return text.includes(validationArguments.constraints[0])

        // 异步校验
        return new Promise<boolean>((resolve) => {
            setTimeout(() => {
                resolve(text.includes(validationArguments.constraints[0]));
            }, 3000)
        })
    }
}