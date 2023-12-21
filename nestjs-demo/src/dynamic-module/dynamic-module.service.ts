import { Injectable } from '@nestjs/common';
import { CreateDynamicModuleDto } from './dto/create-dynamic-module.dto';
import { UpdateDynamicModuleDto } from './dto/update-dynamic-module.dto';

@Injectable()
export class DynamicModuleService {
    getText(): string {
      return `this is a DynamicModuleService`
    }
}
