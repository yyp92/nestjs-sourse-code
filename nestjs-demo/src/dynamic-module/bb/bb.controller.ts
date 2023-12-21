import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { BbService } from './bb.service';
import { CreateBbDto } from './dto/create-bb.dto';
import { UpdateBbDto } from './dto/update-bb.dto';

@Controller('bb')
export class BbController {
    constructor(
        private readonly bbService: BbService,
        @Inject('CONFIG_OPTIONS') private configOptions: Record<string, any>
    ) {}

    @Get()
    getText(): string {
        console.log('configOptions: ', this.configOptions)
        return this.bbService.getText()
    }
}
