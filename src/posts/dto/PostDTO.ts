import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Posts } from "src/posts/entities/posts.entity";
import { User } from "src/users/entities/users.entity";
import { FindOperator } from "typeorm";

export class CreatePostDto {
  
  comments: readonly Comment[] | FindOperator<Comment>;
  user: User | FindOperator<User>;
  
  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @IsNotEmpty()
  @MaxLength(40)
  topic: string;

  @IsNotEmpty()
  @MaxLength(2800)
  text: string;

}