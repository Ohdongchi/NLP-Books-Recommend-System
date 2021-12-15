import { forwardRef, Module } from '@nestjs/common';
import { LocalStrategy } from './Strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './Strategy/jwt.Strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Books } from 'src/entities/books.entity';
import { jwtConstants } from './constans';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Books]), // typeorm forfeature를 통하여 내가 사용할 레퍼지토리의 범위를 지정
    // 그 후 서비스에서 injectRepository로 User, books를 가져와 연결
    forwardRef( ()=> UserModule),
    PassportModule,
    ConfigModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.time },
    }),
    // JwtModule.registerAsync({
    //   imports:[ConfigModule],
    //   inject:[ConfigService],
    //   useFactory: (configService:ConfigService)=>({
    //     secret: configService.get<string>("JWT_KEY"),
    //     signOptions:{expiresIn: configService.get<string>("JWT_KEY_TIME")},
    //   })
    // })
  ], 
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports:[TypeOrmModule, AuthService],
})
export class AuthModule {}
