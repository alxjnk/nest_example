import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    photo: string;

    @Column()
    userType: string;

    // @ManyToOne(type => User, user => user.tasks, { eager: false })
    // user: User;

    // @Column()
    // userId: number;
}