import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AppService } from './app.service';

interface FindById {
    id: number;
}

interface Book {
    id: number;
    name: string;
    desc: string;  
}

interface BookService {
    findBook(param: FindById): Book  
}

@Controller()
export class AppController {
    @Inject('BOOK_PACKAGE') 
    private client: ClientGrpc;
  
    private bookService: BookService;

    constructor(private readonly appService: AppService) {}

    onModuleInit() {
        this.bookService = this.client.getService('BookService')
    }

    @Get('book/:id')
    getHero(@Param('id') id: number) {
        return this.bookService.findBook({
            id
        })
    }
}
