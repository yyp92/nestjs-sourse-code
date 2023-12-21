import { Injectable } from '@nestjs/common';
import { CreateMetadataAndReflectorDto } from './dto/create-metadata-and-reflector.dto';
import { UpdateMetadataAndReflectorDto } from './dto/update-metadata-and-reflector.dto';

@Injectable()
export class MetadataAndReflectorService {
  getText() {
    return 'MetadataAndReflectorService'
  }
}
