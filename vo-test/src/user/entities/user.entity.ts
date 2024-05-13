import { Exclude, Expose, Transform } from "class-transformer";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

export class User {
    @ApiProperty()
    id: number;

    @ApiProperty()
    username: string;

    @ApiHideProperty()
    @Exclude()
    password: string;

    @ApiProperty()
    // @Expose 是添加一个导出的字段，这个字段是只读的
    @Expose()
    get xxx(): string {
        return `${this.username} ${this.email}`
    }

    @ApiProperty()
    // @Transform 是对返回的字段值做一些转换
    @Transform(({value}) => '邮箱是：' + value)
    email: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
