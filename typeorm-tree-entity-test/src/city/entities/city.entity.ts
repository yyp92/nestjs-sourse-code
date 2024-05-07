import {
    Column,
    CreateDateColumn, 
    Entity,
    PrimaryGeneratedColumn,
    Tree,
    TreeChildren,
    TreeParent,
    UpdateDateColumn
} from "typeorm";

@Entity()
/**
 * 4种储存模式
 * closure-table (一般都是用): 用两个表存储
 * materialized-path: 用单表存储
 * adjacency-list: 邻接列表
 * nested-set: 嵌套集合
 */
@Tree('materialized-path')
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    status: number;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;
    
    @Column()
    name: string;

    // 通过 @TreeChildren 声明的属性里存储着它的 children 节点
    @TreeChildren()
    children: City[];

    // 通过 @TreeParent 声明的属性里存储着它的 parent 节点
    @TreeParent()
    parent: City;
}

