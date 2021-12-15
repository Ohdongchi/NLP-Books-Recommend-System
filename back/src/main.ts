import { NestFactory } from '@nestjs/core';
import {NestExpressApplication } from "@nestjs/platform-express";
import {join} from "path";
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import * as path from "path";


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setBaseViewsDir(join(__dirname,"../..","views"));
  // app.setViewEngine('hbs');
  await app.listen(3001);
};

bootstrap();