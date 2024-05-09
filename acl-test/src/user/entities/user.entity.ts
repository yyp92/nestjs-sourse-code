import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable
} from "typeorm";
import { Permission } from "./permission.entity";

// User 有 id、username、password、createTime、updateTime 5 个字段。
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50
    })
    username: string;

    @Column({
        length: 50
    })
    password: string;

    @CreateDateColumn()
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;

    // 在 User 里加入和 Permission 的关系，也就是多对多
    @ManyToMany(() => Permission)
    // 多对多是需要中间表的，通过 @JoinTable 声明，指定中间表的名字
    @JoinTable({
        name: 'user_permission_relation'
    })
    permissions: Permission[] 
}
