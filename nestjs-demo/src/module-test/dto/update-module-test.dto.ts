import { PartialType } from '@nestjs/mapped-types';
import { CreateModuleTestDto } from './create-module-test.dto';

export class UpdateModuleTestDto extends PartialType(CreateModuleTestDto) {}
