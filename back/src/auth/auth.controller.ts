import { Body, Controller, Get, Post, Query, Request, Response, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { AuthenticateDto } from 'src/dto/AuthenticateUserDto';
import LocalAuthGuard from "./guard/local-auth.guard";
import { hash } from 'bcrypt';

// import JwtAuthGuard from "./guard/jwt-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post("test")
  async test() {
    return await hash("1234", 10);
  }

  @Post("register")
  Register(@Request() req, @Response() res) { 
    console.log(req.body);
    this.authService.register(req.body);
    return res.send("ok");
  }

  @Post("eval")
  async Validation(@Request() req) {
    const findEmailValidation = await this.authService.validateEmail(req.body.email);
    
    return findEmailValidation;
  }
// example0@example.com
  @UseGuards(AuthGuard("local"))
  @Post('login')
  Login(@Request() req) {
    const token = this.authService.login(req.user);
    return token ;
  }
  
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req, @Headers() head) {
    return req.user;
  }
}

// 다시 한 번, passport-jwt 모듈을 구성할 때 @nestjs/passport 모듈이 자동으로 프로비저닝한 AuthGuard를 적용합니다.
// 이 가드는 기본 이름 jwt로 참조됩니다. GET /profile 경로가 적중되면 가드는 자동으로 passport-jwt 사용자 정의 구성 로직을 호출하여, 
// JWT를 검증하고 user 속성을 Request 객체에 할당합니다.