import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity({
    name: 'permissions'
})
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    // 权限代码
    @Column({
        length: 20,
        comment: '权限代码'
    })
    code: string;

    // 权限描述
    @Column({
        length: 100,
        comment: '权限描述'
    })
    description: string;
}
