import { IsNotEmpty } from 'class-validator'

export class CreateTodoDto {
    @IsNotEmpty()
    title: string;

    photo: string;

    userType: string;
}



