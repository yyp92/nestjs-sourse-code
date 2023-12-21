import { Injectable } from '@nestjs/common';
import { CreateInterceptorTestDto } from './dto/create-interceptor-test.dto';
import { UpdateInterceptorTestDto } from './dto/update-interceptor-test.dto';

@Injectable()
export class InterceptorTestService {
    getHello() {
        return 'hello interceptor'
    }
}
