import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdDto } from 'src/common/dtos/request/id.dto';
import { AlertService } from './alert.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@ApiTags('Alert Service')
@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @ApiOperation({
    description: 'Send alert in case monitored service dysfunction',
  })
  @Post()
  create(@Body() createAlertDto: CreateAlertDto) {
    return this.alertService.create(createAlertDto);
  }

  @Get()
  findAll() {
    return this.alertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alertService.findOne(+id);
  }

  @Patch()
  update(@Body() updateAlertDto: UpdateAlertDto) {
    return this.alertService.update(updateAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertService.remove(+id);
  }
}
