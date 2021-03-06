import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    findAll():Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(email:string): Promise<User> {
        return await this.userRepository.findOne({
            where:{email:email}
        });
    }

    async remove(id:string): Promise<void> {
        await this.userRepository.delete(id);
    }


    // register():Promise<User[]> {

    // }

}
