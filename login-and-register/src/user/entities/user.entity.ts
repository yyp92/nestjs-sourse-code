import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class User {
    // id 列是主键、自动递增。
    @PrimaryGeneratedColumn()
    id: number;

    // username 和 password 是用户名和密码，类型是 VARCHAR(50)。
    @Column({
        length: 50,
        comment: '用户名'
    })
    username: string;

    @Column({
        length:50,
        comment: '密码'
    })
    password: string;

    // createTime 是创建时间
    @CreateDateColumn({
        comment: '创建时间'
    })
    createTime: Date;

    // updateTime 是更新时间
    @UpdateDateColumn({
        comment: '更新时间'
    })
    updateTime: Date;
}
