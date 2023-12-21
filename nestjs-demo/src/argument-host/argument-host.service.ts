import { Injectable } from '@nestjs/common';
import { CreateArgumentHostDto } from './dto/create-argument-host.dto';
import { UpdateArgumentHostDto } from './dto/update-argument-host.dto';

@Injectable()
export class ArgumentHostService {
  getText() {
    return 'ArgumentHostService'
  }
}
