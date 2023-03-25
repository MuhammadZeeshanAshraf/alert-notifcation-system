import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EscalationPolicyService } from './escalation-policy.service';
import { CreateEscalationPolicyDto } from './dto/create-escalation-policy.dto';
import { UpdateEscalationPolicyDto } from './dto/update-escalation-policy.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Escalation Policy')
@Controller('escalation-policy')
export class EscalationPolicyController {
  constructor(private readonly escalationPolicyService: EscalationPolicyService) {}

  @Post()
  create(@Body() createEscalationPolicyDto: CreateEscalationPolicyDto) {
    return this.escalationPolicyService.create(createEscalationPolicyDto);
  }

  @Get()
  findAll() {
    return this.escalationPolicyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.escalationPolicyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEscalationPolicyDto: UpdateEscalationPolicyDto) {
    return this.escalationPolicyService.update(+id, updateEscalationPolicyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.escalationPolicyService.remove(+id);
  }
}
