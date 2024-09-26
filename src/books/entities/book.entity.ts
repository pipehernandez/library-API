import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 150, nullable: false })
    title: string;

    @Column({ type: 'varchar', length: 150 })
    author: string;

    @Column({ type: 'date', nullable: true })
    publishedDate: Date;

    @Column({ type: 'varchar', length: 50 })
    genre: string
}
