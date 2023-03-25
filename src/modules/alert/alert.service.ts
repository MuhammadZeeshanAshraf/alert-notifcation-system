import { Injectable } from '@nestjs/common';
import {
  RESPONSE_MESSAGE,
  RESPONSE_STATUS,
  USER_GROUP_BY_ALERT_TYPE_KEY,
} from 'src/common/contants';
import { GroupTypeInterface } from 'src/common/interfaces/group-by.interface';
import { UtilsService } from 'src/common/utils/UtilsService';
import { PolicyTarget } from '../escalation-policy/entities/policy-target.entity';
import { EscalationPolicyService } from '../escalation-policy/escalation-policy.service';
import { MailService } from '../mail/mail.service';
import { PagerService } from '../pager/pager.service';
import { TwilioSmsService } from '../twilio-sms/twilio-sms.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Injectable()
export class AlertService {
  constructor(
    private pagerService: PagerService,
    private escalationPolicyService: EscalationPolicyService,
    private mailService: MailService,
    private twilioSmsService: TwilioSmsService,
    private utilsService: UtilsService,
  ) {}

  async create(createAlertDto: CreateAlertDto) {
    console.log(createAlertDto);
    const { serviceId, message } = createAlertDto;
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
    console.log(monitoredService);
    if (monitoredService.isHealthy) {
      await this.pagerService.makeMonitoredServiceUnHealthy(serviceId);
    }

    const targets: PolicyTarget[] =
      await this.escalationPolicyService.getTargetUserByService(serviceId);
    console.log(targets);
    if (targets.length === 0) {
      const errorMessage = RESPONSE_MESSAGE.NO_TARGET_USERS;
      return this.utilsService.getHandledErrorModel(
        RESPONSE_STATUS.FAIL,
        errorMessage,
        new Error(errorMessage),
      );
    }
    const users = this.utilsService.flatternNestObjectArray(targets);

    console.log(users);
    const usersGroupByAlertType: GroupTypeInterface =
      this.utilsService.groupByProperty(users, USER_GROUP_BY_ALERT_TYPE_KEY);
    console.log(usersGroupByAlertType);
    const { name } = monitoredService;
    if (
      usersGroupByAlertType?.email.length !== 0 &&
      usersGroupByAlertType?.SMS.length !== 0
    ) {
      await Promise.all([
        // this.mailService.sendEmailToTargetUsers(
        //   name,
        //   message,
        //   usersGroupByAlertType?.email,
        // ),
        this.twilioSmsService.sendEmailToTargetUsers(message, usersGroupByAlertType?.SMS)
      ]);
      return;
    } else if (usersGroupByAlertType?.email.length !== 0) {
      await this.mailService.sendEmailToTargetUsers(
        name,
        message,
        usersGroupByAlertType?.email,
      );
      return;
    } else if (usersGroupByAlertType?.SMS.length !== 0) {
      await this.twilioSmsService.sendEmailToTargetUsers(message, usersGroupByAlertType?.SMS);
      return;
    }

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
