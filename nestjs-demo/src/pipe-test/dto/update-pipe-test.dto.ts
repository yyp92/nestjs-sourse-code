import { PartialType } from '@nestjs/mapped-types';
import { CreatePipeTestDto } from './create-pipe-test.dto';

export class UpdatePipeTestDto extends PartialType(CreatePipeTestDto) {}
