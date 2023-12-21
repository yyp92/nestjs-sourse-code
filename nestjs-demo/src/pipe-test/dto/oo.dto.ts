import { IsInt } from "class-validator";

export class Oo {
    name: string;
    @IsInt()
    age: number;
    sex: boolean;
    hobbies: Array<string>;
}