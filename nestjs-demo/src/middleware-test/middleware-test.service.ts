import { Injectable } from '@nestjs/common';
import { CreateMiddlewareTestDto } from './dto/create-middleware-test.dto';
import { UpdateMiddlewareTestDto } from './dto/update-middleware-test.dto';

@Injectable()
export class MiddlewareTestService {
    getHello() {
        return 'hello world'
    }
}
