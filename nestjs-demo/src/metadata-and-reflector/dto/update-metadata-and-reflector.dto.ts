import { PartialType } from '@nestjs/mapped-types';
import { CreateMetadataAndReflectorDto } from './create-metadata-and-reflector.dto';

export class UpdateMetadataAndReflectorDto extends PartialType(CreateMetadataAndReflectorDto) {}
