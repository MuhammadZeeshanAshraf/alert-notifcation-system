import { Injectable } from '@nestjs/common';
import { CreatePagerDto } from './dto/create-pager.dto';
import { UpdatePagerDto } from './dto/update-pager.dto';

@Injectable()
export class PagerService {
  create(createPagerDto: CreatePagerDto) {
    return 'This action adds a new pager';
  }

  findAll() {
    return `This action returns all pager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pager`;
  }

  update(id: number, updatePagerDto: UpdatePagerDto) {
    return `This action updates a #${id} pager`;
  }

  remove(id: number) {
    return `This action removes a #${id} pager`;
  }
}
