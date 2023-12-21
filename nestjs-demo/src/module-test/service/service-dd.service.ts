import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ServiceCcService } from './service-cc.service';

@Injectable()
export class ServiceDdService {
    constructor(@Inject(forwardRef(() => ServiceCcService)) private serviceCcService: ServiceCcService) {}
    // constructor(private serviceCcService: ServiceCcService) {}

    dd() {
        return this.serviceCcService.cc()  + 'dd';
    }
}
