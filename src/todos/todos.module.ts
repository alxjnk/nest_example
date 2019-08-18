import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TodoRepository } from './todo.repository';



@Module({
  imports: [TypeOrmModule.forFeature([TodoRepository]),
    AuthModule],
  providers: [TodosService],
  controllers: [TodosController]
})
export class TodosModule {}
