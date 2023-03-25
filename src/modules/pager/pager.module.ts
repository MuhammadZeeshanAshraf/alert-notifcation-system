import { Module } from '@nestjs/common';
import { PagerService } from './pager.service';
import { PagerController } from './pager.controller';

@Module({
  controllers: [PagerController],
  providers: [PagerService]
})
export class PagerModule {}
