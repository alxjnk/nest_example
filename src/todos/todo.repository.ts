import { Repository, EntityRepository } from "typeorm";
import { Todo } from './todo.entity';
import { CreateTodoDto } from "./dto/create-todo.dto";
// import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
// import { User } from "../auth/user.entity";
import { Logger, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
    private logger = new Logger('TodoRepository')

    async getTodos(): Promise<Todo[]> {
        const query = this.createQueryBuilder('todo');
       
        try {
            const todos = await query.getMany();
            return todos;
        } catch (e) {
            this.logger.error(`Failed to get todos}`, e.stack)
            throw new InternalServerErrorException();
        }

    }
    async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
        const { title, userType } = createTodoDto;

        const todo = new Todo();
        todo.title = title;
        todo.photo = 'no photo'; //add photos for tasks here
        todo.userType = userType;


        try {
            await todo.save();
        } catch (e) {
            this.logger.error(`Failed to create todo. Data ${createTodoDto}`, e.stack)
            throw new InternalServerErrorException();
        }

        return todo;
    }

}