import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class User {
    // 逻辑主键
    @ObjectIdColumn()
    _id: ObjectId;

    @Column('text')
    name: string;

    @Column({length: 200})
    email: string;
}
