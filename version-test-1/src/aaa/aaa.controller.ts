import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Version,
    VERSION_NEUTRAL
} from '@nestjs/common';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';

@Controller({
    path: 'aaa',

    // version: '1',

    // 如果你想所有版本都能访问这个接口，可以用 VERSION_NEUTRAL 这个常量
    // version: VERSION_NEUTRAL

    version: ['1', '3']
})
export class AaaController {
    constructor(private readonly aaaService: AaaService) {}

    @Post()
    create(@Body() createAaaDto: CreateAaaDto) {
        return this.aaaService.create(createAaaDto);
    }

    // @Version('2')
    // @Get()
    // findAllV2() {
    //     return this.aaaService.findAll() + '222';
    // }

    @Get()
    findAll() {
        return this.aaaService.findAll();
    }


    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.aaaService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAaaDto: UpdateAaaDto) {
        return this.aaaService.update(+id, updateAaaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.aaaService.remove(+id);
    }
}
