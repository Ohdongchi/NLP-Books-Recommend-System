import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import { getManager, Repository } from 'typeorm';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
    ) { }

    async findReviews(isbn: string): Promise<any[]> {
        
        const entityManager = getManager();
        return await entityManager.query(`select review, \`date\`, booksIsbn, email, nickname from review left join user on review.userid = user.id where booksISBN = "${isbn}"`);
    }

    async createReview(review: string, isbn: string): Promise<string> {

        const entityManager = getManager();

        const date = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
        entityManager.query(`insert into review(review, date, userId, BooksIsbn) values('${review}', '${date}', 1, '${isbn}')`);

        return "ok";
    }
}
