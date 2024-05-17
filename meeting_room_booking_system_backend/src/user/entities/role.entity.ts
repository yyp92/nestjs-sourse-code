import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Permission } from "./permission.entity";

@Entity({
    name: 'roles'
})
export class Role {
    // id
    @PrimaryGeneratedColumn()
    id: number;

    // 角色名
    @Column({
        length: 20,
        comment: '角色名'
    })
    name: string;

    // 权限表 permissions
    @ManyToMany(() => Permission)
    @JoinTable({
        name: 'role_permissions'
    })
    permissions: Permission[] 
}
