import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DynamicModuleService } from './dynamic-module.service';
import { CreateDynamicModuleDto } from './dto/create-dynamic-module.dto';
import { UpdateDynamicModuleDto } from './dto/update-dynamic-module.dto';

@Controller('dynamic-module')
export class DynamicModuleController {
    constructor(private readonly dynamicModuleService: DynamicModuleService) {}

    @Get()
    getText(): string {
        return this.dynamicModuleService.getText()
    }
}
