import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Posts } from "src/posts/entities/posts.entity";
import { FindOperator } from "typeorm";

export class CreateUserDto {
  
  comments: readonly Comment[] | FindOperator<Comment>;
  posts: readonly Posts[] | FindOperator<Posts>;
  
  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @IsNotEmpty()
  @MaxLength(40)
  user_name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
  
}
