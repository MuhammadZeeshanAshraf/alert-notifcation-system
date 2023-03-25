import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export async function getSwaggerConfiguration(
  app: NestExpressApplication,
) {
  /* Swagger Configuration */
  const config = new DocumentBuilder()
    .setTitle('Alert Notification Service')
    .setDescription('The Alert Notification Service API description')
    .setVersion('1.0')
    .addTag('Alert Notification')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
