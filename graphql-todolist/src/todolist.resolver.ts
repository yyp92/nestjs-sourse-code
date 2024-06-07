/**
 * * 然后实现 resolver，也就是这些接口的实现
 */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateTodoList } from './todolist-create.dto';
import { UpdateTodoList } from './todolist-update.dto';

// * 用 @Resolver 声明 resolver，用 @Query 声明查询接口，@Mutation 声明增删改接口，@Args 取传入的参数。
@Resolver()
export class TodolistResolver {
    @Inject(PrismaService)
    private prismaService: PrismaService;

    @Query("todolist")
    async todolist() {
        return this.prismaService.todoItem.findMany();
    }

    @Query("queryById")
    async queryById(@Args('id') id) {
        return this.prismaService.todoItem.findUnique({
            where: {
                id
            }
        })
    }

    @Mutation("createTodoItem")
    async createTodoItem(@Args("todoItem") todoItem: CreateTodoList) {
        return this.prismaService.todoItem.create({
            data: todoItem,
            select: {
                id: true,
                content: true,
                createTime: true
            }
        });
    }


    @Mutation("updateTodoItem")
    async updateTodoItem(@Args('todoItem') todoItem: UpdateTodoList) {
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

    @Mutation("removeTodoItem")
    async removeTodoItem(@Args('id') id: number) {
        await this.prismaService.todoItem.delete({
            where: {
                id
            }
        })

        return id;
    }
}
