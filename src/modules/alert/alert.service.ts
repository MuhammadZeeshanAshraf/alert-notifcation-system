import { Injectable } from '@nestjs/common';
import { RESPONSE_MESSAGE, RESPONSE_STATUS } from 'src/common/contants';
import { UtilsService } from 'src/common/utils/UtilsService';
import { EscalationPolicyService } from '../escalation-policy/escalation-policy.service';
import { PagerService } from '../pager/pager.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Injectable()
export class AlertService {
  constructor(
    private pagerService: PagerService,
    private escalationPolicyService: EscalationPolicyService,
    private utilsService: UtilsService,
  ) {}

  async create(createAlertDto: CreateAlertDto) {
    const { serviceId } = createAlertDto;
    const monitoredService = await this.pagerService.findOne(serviceId);
    if (monitoredService === null) {
      const errorMessage = RESPONSE_MESSAGE.DOES_NOT_EXIST.replace(
        '%d',
        `Monitored Service`,
      );
      return this.utilsService.getHandledErrorModel(
        RESPONSE_STATUS.FAIL,
        errorMessage,
        new Error(errorMessage),
      );
    }
    await this.pagerService.makeMonitoredServiceUnHealthy(serviceId);
    await this.escalationPolicyService.getTargetUserByService(serviceId);
    console.log(monitoredService);

    console.log(createAlertDto);
    return 'This action adds a new alert';
  }

  findAll() {
    return `This action returns all alert`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alert`;
  }

  update(id: number, updateAlertDto: UpdateAlertDto) {
    return `This action updates a #${id} alert`;
  }

  remove(id: number) {
    return `This action removes a #${id} alert`;
  }
}
