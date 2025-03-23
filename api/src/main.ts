import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import { AppModule } from 'src/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api', { exclude: ['/health'] });
  app.use(compression());

  const openApiConfig = new DocumentBuilder()
      .setTitle('State Service API')
      .addBearerAuth({
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
          name: 'Authorization',
          description: 'Enter your Bearer token',
      })
      .addSecurityRequirements('bearer')
      .build();
  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('api/swagger', app, document);

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('app.port') || 3000;

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app
    .listen(port, '0.0.0.0')
    .then(() => {
      Logger.log(`App is listening at ${port} `, 'bootstrap');
    })
    .catch((err) => Logger.error(err, 'bootstrap'))
    .finally(() => Logger.flush());
}

bootstrap();
