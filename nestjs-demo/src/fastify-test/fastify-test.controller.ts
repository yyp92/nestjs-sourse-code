import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Response } from '@nestjs/common';
import { FastifyTestService } from './fastify-test.service';
import { CreateFastifyTestDto } from './dto/create-fastify-test.dto';
import { UpdateFastifyTestDto } from './dto/update-fastify-test.dto';
import { FastifyRequest, FastifyReply } from 'fastify';

@Controller('fastify-test')
export class FastifyTestController {
    constructor(private readonly fastifyTestService: FastifyTestService) {}

    // @Get()
    // getText(@Request() request: FastifyRequest, @Response() reply: FastifyReply) {
    //     reply.header('url', request.url)
    //     reply.send('hello')
    // }

    @Get()
    getText(@Request() request: FastifyRequest, @Response({passthrough: true}) reply: FastifyReply) {
        reply.header('url', request.url)
        
        return 'hello'
    }
}
