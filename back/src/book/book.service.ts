import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Books } from 'src/entities/books.entity';
import { itemCF } from 'src/entities/collaboration/itemCF.entity';
import { Review } from 'src/entities/review.entity';
import { DocToVec } from 'src/entities/TFIDF_Doc2vec/Doc2Vec.entity';
import { TFIDF } from 'src/entities/TFIDF_Doc2vec/TFIDF.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { getManager } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Books)
    private booksRepository: Repository<Books>,
    @InjectRepository(itemCF)
    private itemRepository: Repository<itemCF>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(DocToVec)
    private DocToVecRepository: Repository<DocToVec>,
  ) {}

  async findBestSeller(): Promise<Books[]> {
    const data = await this.booksRepository.find({
      order: {
        hit: 'DESC',
      },
      take:8
    });
    return data;
  }

  async findAll(): Promise<Books[]> {
    const entityManager = getManager();
    return await entityManager.query(
      'select * from books order by hit DESC limit 8',
    );
  }

  async findOneIsbn(isbn: string): Promise<any[]> {
    const entityManager = getManager();
    const Detail = await entityManager.query(
      `select isbn, title, sub_title, writer, publication_date, rate, category, intro, chapter, eng_intro, eng_chapter, hit, image_url, publisher_name from books left join publisher on books.publisher_id = publisher.id where isbn="${isbn}"`,
    );

    const Review = await entityManager.query(
      `select review, \`date\`, booksIsbn, email, nickname from review left join user on review.userid = user.id where booksISBN = "${isbn}"`,
    );

    await entityManager.query(
      `update books set hit = hit + 1 where isbn='${isbn}'`,
    );

    const tempArray = [];
    Object.values(Review).map((data: any) => {
      tempArray.push({
        review: data.review,
        nickname: data.nickname,
        date: data.date,
        email: data.email,
      });
    });

    const total = [Detail[0], tempArray];

    return total;
  }
  //left join publisher on books.publisher_id = publisher.id where isbn in (select doctovec.destinationISBN from doctovec where doctovec.sourceISBN = "${isbn}"

  // 사용자와 취향위 비슷한 사람이 선호하는 도서
  async findUserCf(userid: number): Promise<Books[]> {
    const entityManager = getManager();
    const result = await entityManager.query(
      `select * from books where isbn in (select isbn from usercf where userid=${userid})`,
    );
    return result;
  }

  // 사용자의 리뷰 평가를 기반으로한 추천 도서
  async findItemCf(userid: number): Promise<itemCF[]> {
    const entityManager = getManager();
    const result = await entityManager.query(
      `select * from books where isbn in (select isbn from itemcf where userid=${userid})`,
    );
    // console.log("book service findItemCf", result);
    return result;
  }

  // Doc2Vec = 인공지능이 추천 해주는 도서
  async findDocToVec(userid: string): Promise<DocToVec[]> {
    const entityManager = getManager();
    const DOC_TO_VEC = await entityManager.query(
      `select * from books where isbn in (select destinationISBN from doctovec where doctovec.sourceISBN = (SELECT review.booksIsbn FROM hanium.review where userid=${userid} order by \`date\` DESC limit 1));`,
    );
    return DOC_TO_VEC;
  }

  // TF_IDF = 상세 페이지 책과 유사한 도서
  async findTFIDF(isbn: string): Promise<TFIDF[]> {
    const entityManager = getManager();
    const TF_IDF = await entityManager.query(
      `select isbn, title, sub_title, writer, publication_date, rate, category, intro, chapter, eng_intro, eng_chapter, hit, image_url, publisher_name from books left join publisher on books.publisher_id = publisher.id where isbn in (select tfidf.destinationISBN from tfidf where tfidf.sourceISBN = "${isbn}")`,
    );
    return TF_IDF;
  }

  async search(keyword: string): Promise<Books[]> {
    const entityManager = getManager();
    const searchData = await entityManager.query(
      `select * from books where title like '%${keyword}%'`,
    ); // query 작성
    return searchData;
  }
}
