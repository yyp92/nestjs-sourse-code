import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, SetMetadata } from '@nestjs/common';
import { MetadataAndReflectorService } from './metadata-and-reflector.service';
import { CreateMetadataAndReflectorDto } from './dto/create-metadata-and-reflector.dto';
import { UpdateMetadataAndReflectorDto } from './dto/update-metadata-and-reflector.dto';

import {ReflectInterceptorInterceptor} from '../reflect-interceptor.interceptor'
import {ReflectGuardGuard} from '../reflect-guard.guard'


@Controller('metadata-and-reflector')
@SetMetadata('roles', ['user'])
export class MetadataAndReflectorController {
    constructor(private readonly metadataAndReflectorService: MetadataAndReflectorService) {}

    @Get()
    @UseGuards(ReflectGuardGuard)
    @UseInterceptors(ReflectInterceptorInterceptor)
    @SetMetadata('roles', ['admin'])
    getText(): string {
        return this.metadataAndReflectorService.getText()
    }
}
