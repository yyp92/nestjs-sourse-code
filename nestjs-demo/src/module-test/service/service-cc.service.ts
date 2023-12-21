import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ServiceDdService } from './service-dd.service';

@Injectable()
export class ServiceCcService {
    constructor(@Inject(forwardRef(() => ServiceDdService)) private serviceDdService: ServiceDdService) {}
    // constructor(private serviceDdService: ServiceDdService) {}

    cc() {
        return 'cc';
    }

    ee() {
        return this.serviceDdService.dd() + 'ee'
    }
}
