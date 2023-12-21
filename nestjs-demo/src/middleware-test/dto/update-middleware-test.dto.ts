import { PartialType } from '@nestjs/mapped-types';
import { CreateMiddlewareTestDto } from './create-middleware-test.dto';

export class UpdateMiddlewareTestDto extends PartialType(CreateMiddlewareTestDto) {}
