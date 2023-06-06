import { IsEmail, IsNotEmpty, MaxLength, MinLength, isEmail, isNotEmpty } from "class-validator";
import { User } from "src/users/entities/users.entity";
import { FindOperator } from "typeorm";

export class CreateCommentDto {

  user: User | FindOperator<User>;

  @IsNotEmpty()
  @MaxLength(1400, {message: 'Превышен лимит символов'})
  text: string;
}
