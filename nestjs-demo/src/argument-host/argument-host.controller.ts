import { Controller, Get, Post, Body, Patch, Param, Delete, Catch, UseFilters, UseGuards } from '@nestjs/common';
import { ArgumentHostService } from './argument-host.service';
import { CreateArgumentHostDto } from './dto/create-argument-host.dto';
import { UpdateArgumentHostDto } from './dto/update-argument-host.dto';
import {TestFilterFilter} from '../test-filter.filter'
import {TestException} from '../TestException'
import { TestGuardGuard } from '../test-guard.guard';
import { Roles } from '../roles.decorator';
import { Role } from '../role';

@Controller('argument-host')
export class ArgumentHostController {
  constructor(private readonly argumentHostService: ArgumentHostService) {}

  @Get()
  @UseFilters(TestFilterFilter)
  @UseGuards(TestGuardGuard)
  @Roles(Role.Admin)
  getText(): string {
    throw new TestException('aaa', 'bbb')

    return this.argumentHostService.getText()
  }
}
