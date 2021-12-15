import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Books } from './books.entity';
@Entity("hashtag")
export class hashtag {
    @PrimaryGeneratedColumn({
        type:"int"
    })
    id:number;
    
    @Column({type:"varchar", length:"50"})
    hashtag_name:string;    

    // @OneToMany(()=>Books, books=>books.hashtag_id)
    // books:Books
}