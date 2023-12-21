import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToMany
} from "typeorm"
import {Tag} from './Tag'

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
        comment: '文章标题'
    })
    title: string;

    @Column({
        type: 'text',
        comment: '文章内容'
    })
    content: string;

    // 比如一篇文章可以有多个标签：
    @ManyToMany(() => Tag, (tag) => tag.articles)
    @JoinTable()
    tags: Tag[];
}
