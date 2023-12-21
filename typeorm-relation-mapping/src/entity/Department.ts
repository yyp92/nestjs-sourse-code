import { Employee } from './Employee';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from "typeorm"

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50
    })
    name: string;

    @OneToMany(() => Employee, (employee) => employee.department)
    employees: Employee[];
}
