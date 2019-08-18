import { NestFactory } from '@nestjs/core';
import { Logger } from "@nestjs/common";
import { AppModule } from './app.module';
import * as config from 'config';


async function bootstrap() {
  const serverConfig = config.get('server');
  const port = process.env.PORT || serverConfig.port

  const logger = new Logger('bootsrap')
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // switch of cors on production

  await app.listen(port);
  logger.log(`App listening on port ${port}`)
}
bootstrap();
