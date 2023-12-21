import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModuleTestService } from './module-test.service';
import { CreateModuleTestDto } from './dto/create-module-test.dto';
import { UpdateModuleTestDto } from './dto/update-module-test.dto';

@Controller('module-test')
export class ModuleTestController {
  constructor(private readonly moduleTestService: ModuleTestService) {}

  @Get()
  getText(): string {
    return this.moduleTestService.getText()
  }
}
