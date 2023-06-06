import { UsersService } from 'src/users/users.service';
import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/UserDTO';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  findAll()
  {
      return this.usersService.findAll();
  }

  @Get(":id")
  @UsePipes(new ValidationPipe())
  findOne(@Param("id") id: string)
  {
      return this.usersService.findOne(+id);
  }
  
  @Put(":id")
  @UsePipes(new ValidationPipe())
  update(@Param("id") id: string, @Body() updateUser: User)
  {
      return this.usersService.update(+id, updateUser);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto)
  {
      return this.usersService.create(createUserDto);
  }

  @Delete(":id")
  @UsePipes(new ValidationPipe())
  remove(@Param("id") id: string)
  {
      return this.usersService.remove(+id);
  }
}
