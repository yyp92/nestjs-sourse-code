import { PartialType } from '@nestjs/mapped-types';
import { CreateAllDecoratorDto } from './create-all-decorator.dto';

export class UpdateAllDecoratorDto extends PartialType(CreateAllDecoratorDto) {}
