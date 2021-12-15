import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { jwtConstants } from '../constans';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter("token"),
      ignoreExpiration: false,
      secretOrKey:jwtConstants.secret,
    });
  }
  validate(payload:any) {
    // const user = await this.authService.validateUser(payload.email, payload.password);
    // console.log("hi1");
    // console.log(user);
    // if (!user) {
    //   throw new UnauthorizedException();
    // } 
    // console.log("jwt", payload);
    if (payload == undefined) {
      return;
    }
    return {userId:payload.userId, email:payload.email, nickname:payload.nickname}
  }

}