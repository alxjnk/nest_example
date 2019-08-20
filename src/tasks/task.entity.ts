import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import { Todo } from "src/todos/todo.entity";

@Entity()
@Unique(['type'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @OneToMany(type => Todo, todo => todo.task, { eager: true })
    todos: Todo[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bycrypt.hash(password, this.salt)
        return hash === this.password;
    }
}