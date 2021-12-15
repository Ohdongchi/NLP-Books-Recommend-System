import { Controller, Get, Param, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { getManager, Repository } from 'typeorm';

@Controller('book')
export class BookController {
  constructor(private booksService: BookService) {}

  @Get('test')
  async test(): Promise<any> {
    return this.booksService.findBestSeller();
  }

  @Get('BestSeller')
  async findBestSeller(): Promise<any> {
    console.time('bestseller sql');
    const BestBooks = await this.booksService.findAll();
    console.timeEnd('bestseller sql');

    // sql 과 orm 시간 차이 확인 또한 sort buffer size 바꿔서 테스트 해보기
    return await this.booksService.findAll();
  }

  @Get('/detail/:isbn')
  async getBooksDetailPage(@Param('isbn') isbn: string): Promise<any> {
    console.log(isbn);

    const Data = await this.booksService.findOneIsbn(isbn);
    // console.log(Data);
    return Data;
  }

  // 사용자와 취향위 비슷한 사람이 선호하는 도서
  @Get('usercf/:userid')
  async usercf(@Param('userid') user_id: number): Promise<any> {
    return await this.booksService.findUserCf(user_id);
  }

  // 사용자의 리뷰 평가를 기반으로한 추천 도서
  @Get('itemcf/:userid')
  async itemcf(@Param('userid') user_id: number): Promise<any> {
    return await this.booksService.findItemCf(user_id);
  }

  @Get('doc2vec/:userid')
  async doc2vec(@Param('userid') user_id: string): Promise<any> {
    return await this.booksService.findDocToVec(user_id);
  }

  @Get('TFIDF/:isbn')
  async TFIDF(@Param('isbn') isbn: string): Promise<any> {
    return await this.booksService.findTFIDF(isbn);
  }

  @Get('search/:keyword')
  async search(@Param('keyword') keyword: string): Promise<any> {
    return await this.booksService.search(keyword);
  }
}
