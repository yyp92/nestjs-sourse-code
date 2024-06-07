import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateTodoList } from './todolist-create.dto';
import { UpdateTodoList } from './todolist-update.dto';

@Injectable()
export class AppService {
    // @Inject 注入 PrismaService，用它来做 CRUD，where 是条件、data 是数据，select 是回显的字段
    @Inject(PrismaService)
    private prismaService: PrismaService;

    getHello(): string {
        return 'Hello World!';
    }

    async query() {
        return this.prismaService.todoItem.findMany({
            select: {
                id: true,
                content: true,
                createTime: true
            }
        });
    }
    
    async create(todoItem: CreateTodoList) {
        return this.prismaService.todoItem.create({
            data: todoItem,
            select: {
                id: true,
                content: true,
                createTime: true
            }
        });
    }
    
    async update(todoItem: UpdateTodoList) {
        return this.prismaService.todoItem.update({
            where: {
                id: todoItem.id
            },
            data: todoItem,
            select: {
                id: true,
                content: true,
                createTime: true
            }
        });
    }

    async remove(id: number) {
        return this.prismaService.todoItem.delete({
            where: {
                id
            }
        })
    }
}
