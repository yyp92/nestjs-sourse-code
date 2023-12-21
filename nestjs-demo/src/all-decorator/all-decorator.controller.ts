import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { AllDecoratorService } from './all-decorator.service';
import { CreateAllDecoratorDto } from './dto/create-all-decorator.dto';
import { UpdateAllDecoratorDto } from './dto/update-all-decorator.dto';


/**
 * @Controller 声明其中的 controller
 */
@Controller('all-decorator')
export class AllDecoratorController {
  // 构造器注入
  // constructor(private readonly allDecoratorService: AllDecoratorService) {}

  /**
   * 或者属性注入
   * 
   * 属性注入要指定注入的 token，可能是 class 也可能是 string。
   */
  @Inject(AllDecoratorService)
  private readonly allDecoratorService: AllDecoratorService;
  @Inject('Guang')
  private readonly guang: Record<string, any>;


  @Get()
  getText() {
    console.log('guang', this.guang)

    return this.allDecoratorService.getText()
  }
}
