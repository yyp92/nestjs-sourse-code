import { PartialType } from '@nestjs/mapped-types';
import { CreateHostParamDto } from './create-host-param.dto';

export class UpdateHostParamDto extends PartialType(CreateHostParamDto) {}
