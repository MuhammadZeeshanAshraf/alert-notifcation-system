import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PAGER_DATABASE_CONNECTION } from 'src/common/contants';
import { escalationPolicyModuleDependeniceEntities, escalationPolicyModuleDependeniceRepository } from '../escalation-policy/escalation-policy.module';
import { EscalationPolicyService } from '../escalation-policy/escalation-policy.service';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { pagerModuleDependeniceEntities, pagerModuleDependeniceRepository } from '../pager/pager.module';
import { PagerService } from '../pager/pager.service';
import { AlertController } from './alert.controller';
import { AlertService } from './alert.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ...escalationPolicyModuleDependeniceEntities
    ]),
    TypeOrmModule.forFeature([...pagerModuleDependeniceEntities], PAGER_DATABASE_CONNECTION),
  ],
  controllers: [AlertController],
  providers: [
    AlertService,
    PagerService,
    EscalationPolicyService,
    MailService,
    ...escalationPolicyModuleDependeniceRepository,
    ...pagerModuleDependeniceRepository,
  ],
})
export class AlertModule {}
