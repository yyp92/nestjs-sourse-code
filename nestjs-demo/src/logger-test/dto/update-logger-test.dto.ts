import { PartialType } from '@nestjs/mapped-types';
import { CreateLoggerTestDto } from './create-logger-test.dto';

export class UpdateLoggerTestDto extends PartialType(CreateLoggerTestDto) {}
