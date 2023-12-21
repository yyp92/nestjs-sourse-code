import { Injectable } from '@nestjs/common';
import { CreateAllDecoratorDto } from './dto/create-all-decorator.dto';
import { UpdateAllDecoratorDto } from './dto/update-all-decorator.dto';


/**
 * @Injectable 声明其中的 provider
 */
@Injectable()
export class AllDecoratorService {
  getText() {
    return `This action returns all allDecorator`;
  }
}
