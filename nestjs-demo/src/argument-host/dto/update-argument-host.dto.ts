import { PartialType } from '@nestjs/mapped-types';
import { CreateArgumentHostDto } from './create-argument-host.dto';

export class UpdateArgumentHostDto extends PartialType(CreateArgumentHostDto) {}
