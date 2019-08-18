import { Controller, UseGuards, Logger, Get, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { TodosService } from './todos.service'
import { AuthGuard } from '@nestjs/passport';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
// @UseGuards(AuthGuard())
export class TodosController {
    private logger = new Logger('TodosController')
    constructor(private todosService: TodosService) { }

    @Get()
    getTodos() {
        this.logger.verbose(`Get todos method works`)
        return this.todosService.getTodos();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTodo(
        @Body() createTodoDto: CreateTodoDto
    ): Promise<Todo> {
        this.logger.verbose(`Somebody createed new todo: ${JSON.stringify(createTodoDto)}`)
        return this.todosService.createTodo(createTodoDto);
    }

}
