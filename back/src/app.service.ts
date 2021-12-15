import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  tempFunction(): string {
    return "test";
  }
  

  async mypage():Promise<any[]> {
    const entityManager = getManager();
    
    return;
  }
  
}
