import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';
import { TodosModule } from './todos/todos.module';
import { TasksModule } from './tasks/tasks.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    TodosModule,
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      typePaths: ['./**/*.graphql']
    }),
  ],
  providers: [AppGateway],
})
export class AppModule { }
