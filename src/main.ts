import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

const PORT = process.env.PORT as unknown as number;
const publicDirectory = join(__dirname, '..', 'public');
const node_modules = join(__dirname, '..', 'node_modules');
// TODO: update this to build correctly
const jquery = join(node_modules, 'jquery', 'dist');
const htmx = join(node_modules, 'htmx.org', 'dist');

console.log({ node_modules, jquery, htmx, publicDirectory });

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(publicDirectory);
  app.useStaticAssets(jquery);
  app.useStaticAssets(htmx);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(PORT, () => {
    const l = new Logger();
    l.log(`APP LISTENING ON PORT ${PORT}`);
  });
}
bootstrap();
