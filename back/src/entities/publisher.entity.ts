import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Books } from './books.entity';
@Entity("Publisher")
export class Publisher {
    @PrimaryGeneratedColumn({
        type:"int"
    })
    id:number;
    
    @Column({type:"varchar", length:"50"})
    publisher_name;

    @OneToMany(()=>Books, books=>books.publisher_id)
    books:Books
}