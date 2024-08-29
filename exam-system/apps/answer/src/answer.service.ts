import { PrismaService } from '@app/prisma';
import { BadRequestException, Get, Inject, Injectable, Query } from '@nestjs/common';
import { AnswerAddDto } from './dto/answer-add.dto';

@Injectable()
export class AnswerService {
    // getHello(): string {
    //     return 'Hello World!'
    // }

    @Inject(PrismaService)
    private prismaService: PrismaService


    async add(dto: AnswerAddDto, userId: number) {
        // 查询试卷
        const exam = await this.prismaService.exam.findUnique({
            where: {
                id: dto.examId
            }
        })

        // 解析问题数组
        let quesitons = []
        try {
            quesitons = JSON.parse(exam.content)
        }
        catch (e) { }

        // 解析答卷数组
        let answers = []
        try {
            answers = JSON.parse(dto.content)
        }
        catch (e) { }

        // 依次对比每一个答案，对的加分
        let totalScore = 0
        answers.forEach(answer => {
            const question = quesitons.find(item => item.id === answer.id)

            if (question.type === 'input') {
                if (answer.answer.includes(question.answer)) {
                    totalScore += question.score
                }
            }
            else {
                if (answer.answer === question.answer) {
                    totalScore += question.score
                }
            }
        })

        return this.prismaService.answer.create({
            data: {
                content: dto.content,
                score: totalScore,
                answerer: {
                    connect: {
                        id: userId
                    }
                },
                exam: {
                    connect: {
                        id: dto.examId
                    }
                }
            },
        })
    }

    async list(examId: number) {
        return this.prismaService.answer.findMany({
            where: {
                examId
            },
            include: {
                exam: true,
                answerer: true
            }
        })
    }

    async find(id: number) {
        return this.prismaService.answer.findUnique({
            where: {
                id
            },
            include: {
                exam: true,
                answerer: true
            }
        })
    }
}
