import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from "typeorm"
import {Department} from './Department'

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50
    })
    name: string

    @JoinColumn({
        name: 'd_id'
    })
    // 如何给它们添加一对多的映射呢？
    @ManyToOne(() => Department, {
        // cascade: true

        // 如果你设置了 onDelete 为 SET NULL 或者 CASCADE：
        // 那就不用自己删 employee 了，只要删了 department，mysql 会自动把关联的 employee 记录删除，或者是把它们的外键 id 置为空。
        // onDelete: 'CASCADE'
    })
    department: Department;
}
