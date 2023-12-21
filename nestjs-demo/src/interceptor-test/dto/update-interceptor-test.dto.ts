import { PartialType } from '@nestjs/mapped-types';
import { CreateInterceptorTestDto } from './create-interceptor-test.dto';

export class UpdateInterceptorTestDto extends PartialType(CreateInterceptorTestDto) {}
