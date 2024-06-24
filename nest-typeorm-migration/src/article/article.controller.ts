import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get('init-data')
    async initData() {
        await this.articleService.initData();
        return 'done';
    }

    @Get()
    async findAll() {
        return this.articleService.findAll();
    }
}
