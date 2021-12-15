import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Review } from './review.entity';
import { Publisher } from './publisher.entity';

@Entity("Books")
export class Books {
    @PrimaryColumn()
    isbn: string

    @Column({ type: "varchar", length: 255 })
    title: string

    @Column({ type: "varchar", length: 255 })
    sub_title: string

    @Column({type:"text"})
    writer: string

    @Column({type:"int"})
    publisher_id: number

    @Column({type:"date"})
    publication_date: string

    @Column({type:"varchar", length:50})
    rate: string

    @Column({type:"text"})
    category: string

    @Column({type:"text"})
    intro: string

    @Column({type:"text"})
    chapter: string

    @Column({type:"text"})
    eng_intro: string

    @Column({type:"text"})
    eng_chapter:string

    @Column({type:"int", default:0})
    hit:number

    @Column({type:"text"})
    image_url:string

    @OneToMany(()=> Review, review => review.user)
    review:Review[]

    @ManyToOne(()=>Publisher, publisher => publisher.id, {})
    @JoinColumn({name:"publisher_id"})
    publisher:Publisher[]
}