import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Role } from "./role.entity";

@Entity({
    name: 'users'
})
export class User {
    // 用户ID
    @PrimaryGeneratedColumn()
    id: number;

    // 用户名
    @Column({
        length: 50,
        comment: '用户名'
    })
    username: string;

    // 密码
    @Column({
        length: 50,
        comment: '密码'
    })
    password: string;

    // 昵称
    @Column({
        name: 'nick_name',
        length: 50,
        comment: '昵称'
    })
    nickName: string;

    // 邮箱
    @Column({
        comment: '邮箱',
        length: 50
    })
    email: string;

    // 头像
    @Column({
        comment: '头像',
        length: 100,
        nullable: true
    })
    headPic: string;

    // 手机号
    @Column({
        comment: '手机号',
        length: 20,
        nullable: true
    })
    phoneNumber: string;

    // 是否被冻结
    @Column({
        comment: '是否冻结',
        default: false
    })
    isFrozen: boolean;

    // 是否是管理员
    @Column({
        comment: '是否是管理员',
        default: false
    })
    isAdmin: boolean;

    // 创建时间
    @CreateDateColumn()
    createTime: Date;

    // 更新时间
    @UpdateDateColumn()
    updateTime: Date;

    // 角色表 roles
    @ManyToMany(() => Role)
    @JoinTable({
        name: 'user_roles'
    })
    roles: Role[] 
}
