import { Books } from "./books.entity";
import { User } from "./user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("Review")
export class Review {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "text" })
    review: string

    @Column({ type: "timestamp" })
    date: string

    @ManyToOne(()=>User, user=> user.review)
    user:User;

    @ManyToOne(()=>Books, book => book.review)
    books:Books;
}
