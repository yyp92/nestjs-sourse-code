import { PartialType } from '@nestjs/mapped-types';
import { CreateFastifyTestDto } from './create-fastify-test.dto';

export class UpdateFastifyTestDto extends PartialType(CreateFastifyTestDto) {}
