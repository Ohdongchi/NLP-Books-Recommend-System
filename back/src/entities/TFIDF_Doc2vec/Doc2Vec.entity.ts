import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity("DocToVec")
export class DocToVec {

    @PrimaryGeneratedColumn({type:"int"})
    id:number;

    @Column({type:"varchar", length:30})
    sourceISBN:number;

    @Column({type:"varchar", length:30})
    destinationISBN:string;
}