import { Injectable } from '@nestjs/common';
import { CreateBbDto } from './dto/create-bb.dto';
import { UpdateBbDto } from './dto/update-bb.dto';

@Injectable()
export class BbService {
    getText() {
        return `This is a BbService`;
    }
}
