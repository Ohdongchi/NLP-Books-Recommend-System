import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Review } from 'src/entities/review.entity';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
    constructor(
        private reviewService:ReviewService
    ){}

    @Post("/findReview/:isbn")
    async findReviewIsbn(@Param("isbn") isbn:string): Promise<Review[]>  {
        // console.log("findreview controller", isbn);
        const Reviews = await this.reviewService.findReviews(isbn);
        return Reviews;
    }

    @Post("/createReview")
    async postReview(@Body() body:any):Promise<string> {
        // console.log(body);
        await this.reviewService.createReview(body[0], body[1]);
        return "service ok";
    }


}
