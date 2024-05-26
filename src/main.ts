import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

// TODO: you’ll need to use appropriate tooling to use node_modules/htmx.org/dist/htmx.js (or .min.js).

const PORT = process.env.PORT as unknown as number;
const publicDirectory = join(__dirname, '..', 'public');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(publicDirectory);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(PORT, () => {
    const l = new Logger();
    l.log(`APP LISTENING ON PORT ${PORT}`);
  });
}
bootstrap();
