import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne, Unique } from "typeorm";

@Entity()
@Unique(['title'])
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    photo: string;

    @Column()
    userType: string;

    // @Column()


    // @ManyToOne(type => User, user => user.tasks, { eager: false })
    // user: User;

    // @Column()
    // userId: number;
}