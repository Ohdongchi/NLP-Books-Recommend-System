import { Controller, Get, Post, Render, Req, Res, UseGuards, Request, Response, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService:ConfigService
  ) {}

  @Get('/')
  root(@Request() req, @Response() res): void {
    // console.log(this.configService.get<string>('ENVIRONMENT'));
    return res.sendFile(join(__dirname, '..', 'views/index.html'));
  }

  @Get("mypage/:userid")
  async myPage(@Param("userid") userid):Promise<any[]> {
    return await this.appService.mypage();
  }
}

// controller = express router 역할을 한다.
// controller를 나누는 이유는 express의 router 나누기와 같다.
// controller를 예로 들면 express도 app.js에 다 써도 되지만
// 그렇지 않고 page라우트만 따로 나누고 auth라우트를 따로 나누는것과 같다.

// controller에서는 service.ts에 정의된 함수를 끌어와 사용만 할 뿐
// 실질적인 로직은 service.ts에 있다.

// module은 controller와 service를 합쳐준다.

// app.module.ts는 흩어진 작은 module들을 합쳐준다.
