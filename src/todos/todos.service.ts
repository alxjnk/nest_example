import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from './todo.repository';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(TodoRepository)
        private todoRepository: TodoRepository
    ) {}

    async getTodos(): Promise<Todo[]> {
        return this.todoRepository.getTodos();
    }

    async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
        return this.todoRepository.createTodo(createTodoDto);
    }

    async createTodo1(todo: any): Promise<Todo> {
        console.log('CTD',todo)
        return this.todoRepository.createTodo(todo);
    }

    async deleteTodo(id: number): Promise<void> {
        const result = await this.todoRepository.delete({id})

        if (result.affected === 0) {
            throw new NotFoundException('Todo not found');
        }
    }


}
