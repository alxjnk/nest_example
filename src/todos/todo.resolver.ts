import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ParseIntPipe, Body } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';


@Resolver('Todo')
export class TodoResolver {
    constructor(private todosService: TodosService) { }


  @Mutation()
    createTodo(
      @Body() createTodoDto: {todo: CreateTodoDto},
    ): Promise<Todo> {
      return this.todosService.createTodo1(createTodoDto.todo);
    }
  
  @Mutation()
    deleteTodo(
      @Body('id', ParseIntPipe)
      id: number
    ) : void {
      this.todosService.deleteTodo(id)
    }

  @Query()
  getTodos() {
    console.log('get Todos');
    return this.todosService.getTodos();
  }

}