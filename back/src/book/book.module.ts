import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Books } from 'src/entities/books.entity';
import { itemCF } from 'src/entities/collaboration/itemCF.entity';
import { Review } from 'src/entities/review.entity';
import { DocToVec } from 'src/entities/TFIDF_Doc2vec/Doc2Vec.entity';
import { User } from 'src/entities/user.entity';

import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports:[TypeOrmModule.forFeature([User, Books, Review, itemCF, DocToVec])],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
