import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity("itemCF")
export class itemCF {
    @PrimaryGeneratedColumn({type:"int"})
    id:number;

    @Column({type:"int",})
    userid:number;

    @Column({type:"varchar", length:50})
    isbn:string;
}