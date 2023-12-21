/**
 * Metadata 和 Reflector
 */


import { Module } from '@nestjs/common';
import { MetadataAndReflectorService } from './metadata-and-reflector.service';
import { MetadataAndReflectorController } from './metadata-and-reflector.controller';

@Module({
  controllers: [MetadataAndReflectorController],
  providers: [MetadataAndReflectorService],
})
export class MetadataAndReflectorModule {}
