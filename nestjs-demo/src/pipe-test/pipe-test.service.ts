import { Injectable } from '@nestjs/common';
import { CreatePipeTestDto } from './dto/create-pipe-test.dto';
import { UpdatePipeTestDto } from './dto/update-pipe-test.dto';

@Injectable()
export class PipeTestService {
    getHello() {
        return 'PipeTestService'
    }
}
