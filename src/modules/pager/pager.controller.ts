import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PagerService } from './pager.service';
import { CreatePagerDto } from './dto/create-pager.dto';
import { UpdatePagerDto } from './dto/update-pager.dto';
import { ApiTags } from '@nestjs/swagger';
import { IdDto } from 'src/common/dtos/request/id.dto';

@ApiTags('Pager')
@Controller('pager')
export class PagerController {
  constructor(private readonly pagerService: PagerService) {}

  @Post()
  create(@Body() createPagerDto: CreatePagerDto) {
    return this.pagerService.create(createPagerDto);
  }

  @Get()
  findAll() {
    return this.pagerService.findAll();
  }

  @Get(':id')
  findOne(@Param() idDto: IdDto) {
    const { id } = idDto;
    return this.pagerService.findOne(id);
  }

  @Patch(':id')
  update(@Param() idDto: IdDto, @Body() updatePagerDto: UpdatePagerDto) {
    const { id } = idDto;
    return this.pagerService.update(id, updatePagerDto);
  }

  @Delete(':id')
  remove(@Param() idDto: IdDto) {
    const { id } = idDto;
    return this.pagerService.remove(id);
  }
}
