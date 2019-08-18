import { Injectable } from '@nestjs/common';
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

    async createTodo(createTodoDto: CreateTodoDto) {
        return this.todoRepository.createTodo(createTodoDto);
    }


}
