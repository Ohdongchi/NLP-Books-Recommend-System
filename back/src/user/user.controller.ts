import { Controller, Get, Post } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService) {}

    @Get("test")
    findAll():Promise<User[]> {
        return this.userService.findAll();
    }

    @Post("register")
    register():Promise<User[]>{
        return;
        // return this.userService.register();
    }

}
