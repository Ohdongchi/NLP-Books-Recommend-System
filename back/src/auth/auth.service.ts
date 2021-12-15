import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { AuthenticateDto } from 'src/dto/AuthenticateUserDto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  // 회원가입
  async register(userData: AuthenticateDto): Promise<any> {
    let ValidationUser = await this.userRepository.find({
      where: {
        email: userData.email,
      },
    });
    if (ValidationUser.length < 1) {
      this.userRepository.save({
        email: userData[0],
        password: userData[1],
        nickname: userData[2],
        image: '',
      });
      return 'ok';
    }
  }

  // 이메일 중복 체크
  async validateEmail(email: string): Promise<any> {
    if (!email) {
      return;
    }
    const findEmail = await this.userService.findOne(email);
    if (findEmail) {
      return true; // 있다.
    } else {
      return false; // 없다..
    }
  }

  // login
  login(user: any) {
    const payload = {
      email: user.email,
      userId: user.id,
      nickname: user.nickname,
    };
    console.log('access token payload', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
    //access token create
  }

  // passport
  async validateUser(email: string, password: string): Promise<any> {
    const findUser = await this.userService.findOne(email);
    if (findUser && password == findUser.password) {
      const { password, ...result } = findUser;
      console.log("result", result);
      return result;
    }

    return null;
  }
}
