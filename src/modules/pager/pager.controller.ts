import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PagerService } from './pager.service';
import { CreatePagerDto } from './dto/create-pager.dto';
import { UpdatePagerDto } from './dto/update-pager.dto';

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
  findOne(@Param('id') id: string) {
    return this.pagerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagerDto: UpdatePagerDto) {
    return this.pagerService.update(+id, updatePagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagerService.remove(+id);
  }
}
