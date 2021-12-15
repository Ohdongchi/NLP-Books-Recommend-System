import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { join } from "path";

// entity
import { User } from './entities/user.entity';
import { Books } from './entities/books.entity';
import { Review } from './entities/review.entity';
import { Publisher } from './entities/publisher.entity';

// module
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book/book.module';

// config
import { ConfigService } from '@nestjs/config';
import { ReviewModule } from './review/review.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".dev.env", ".prd.env"],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      // rootPath:join("../..","front/dist"),
      rootPath: join(__dirname, "..", "views"),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get<string>("DATABASE_HOST"),
        port: configService.get<number>("DATABASE_PORT"),
        username: configService.get<string>("DATABASE_USER"),
        password: configService.get<string>("DATABASE_PASSWORD"),
        database: configService.get<string>("DATABASE_NAME"),
        entities: [
          "dist/**/*.entity.js"
        ],  
        migrations: [
          "dist/migration/*.js"
        ],
        cli: {
          // "migrations": "src/migration"
        },
        synchronize: false
      }),
      inject:[ConfigService],
    }),
    UserModule,
    AuthModule,
    BookModule,
    ReviewModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


// typeorm은 synchronize가 활성화되면 테이블을 자동으로 생성한다.