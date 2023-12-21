import { Injectable } from '@nestjs/common';
import { CreateCustomDecoratorDto } from './dto/create-custom-decorator.dto';
import { UpdateCustomDecoratorDto } from './dto/update-custom-decorator.dto';

@Injectable()
export class CustomDecoratorService {
  getText() {
    return 'CustomDecoratorService'
  }
}
