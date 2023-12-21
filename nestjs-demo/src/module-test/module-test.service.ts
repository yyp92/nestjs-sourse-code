import { ServiceDdService } from './service/service-dd.service';
import { Injectable } from '@nestjs/common';
import { CreateModuleTestDto } from './dto/create-module-test.dto';
import { UpdateModuleTestDto } from './dto/update-module-test.dto';
import { ServiceCcService } from './service/service-cc.service';

@Injectable()
export class ModuleTestService {
  constructor(
    private serviceCcService: ServiceCcService,
    private serviceDdService: ServiceDdService
  ) {}


  getText(): string {
    return this.serviceDdService.dd() + this.serviceCcService.ee()
  }
}
