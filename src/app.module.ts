import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertModule } from './modules/alert/alert.module';
import { PagerModule } from './modules/pager/pager.module';
import { EscalationPolicyModule } from './modules/escalation-policy/escalation-policy.module';
import { PAGER_DATABASE_CONNECTION } from './common/contants';
import { UtilsModule } from './common/utils/UtilsModule';
import { MailModule } from './modules/mail/mail.module';
import { TwilioModule } from 'nestjs-twilio';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        accountSid: configService.get('TWILIO_ACCOUNT_SID'),
        authToken: configService.get('TWILIO_AUTH_TOKEN'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: configService.get('DB_CONNECTION_NAME'),
        type: 'postgres',
        database: configService.get('DB_NAME'),
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: String(configService.get('DB_PASSWORD')),
        schema: configService.get('DB_SCHEMA'),
        sid: configService.get('DB_NAME'),
        autoLoadEntities: true,
        entities: [],
        logging: false,
        synchronize: false,
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      name: PAGER_DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => ({
        name: configService.get('PAGER_DB_CONNECTION_NAME'),
        type: 'postgres',
        database: configService.get('PAGER_DB_NAME'),
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: String(configService.get('DB_PASSWORD')),
        schema: configService.get('DB_SCHEMA'),
        sid: configService.get('PAGER_DB_NAME'),
        autoLoadEntities: true,
        entities: [],
        logging: false,
        synchronize: false,
      }),
    }),
    /*Modules */
    AlertModule,
    PagerModule,
    EscalationPolicyModule,
    UtilsModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
