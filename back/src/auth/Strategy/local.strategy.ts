import { Strategy } from "passport-local"; // passport local 실행 req.user가 strategy로 들어옴
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService:AuthService) {
        super({
            usernameField:"email", // 기본값이 username인데 usernamefield를 특정 키값으로 지정하기 위해서는 다음과 같이 해야함
            passwordField:"password" // password도 위와 같음 password는 password가 기본값
        });
    }

    // local에 들어오면 validate 함수를 인식하고 validate함수가 실행된다.
    async validate(username:string, password:string): Promise<any> {
        const isUser = await this.authService.validateUser(username, password);
        // console.log("local validate", isUser);
        if (!isUser ) {
            throw new UnauthorizedException();
        }
        return isUser;
    }
}