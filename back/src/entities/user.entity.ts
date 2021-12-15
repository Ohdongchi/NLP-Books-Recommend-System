import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from './review.entity';

@Entity("User")
export class User {
    @PrimaryGeneratedColumn({
        type:"int"
    })
    id:number
    
    @Column({type:"varchar", length:"50"})
    email:string;

    @Column({type:"varchar", length:"30"})
    nickname:string;
    
    @Column({type:"varchar"})
    password:string;

    @Column({type:"text", nullable:true,})
    image:string;

    @OneToMany(()=> Review, review => review.user)
    review:Review[];
}