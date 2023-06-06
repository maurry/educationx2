import { PostsService } from 'src/Posts/posts.service';
import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { Posts } from './entities/posts.entity';
import { CreatePostDto } from './dto/PostDTO';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  findAll()
  {
      return this.postService.findAll();
  }

  @Get(":id")
  @UsePipes(new ValidationPipe())
  findOne(@Param("id") id: string)
  {
      return this.postService.findOne(+id);
  }
  
  @Put(":id")
  @UsePipes(new ValidationPipe())
  update(@Param("id") id: string, @Body() updatePost: Posts)
  {
      return this.postService.update(+id, updatePost);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createPostDto: CreatePostDto)
  {
      return this.postService.create(createPostDto);
  }

  @Delete(":id")
  @UsePipes(new ValidationPipe())
  remove(@Param("id") id: string)
  {
      return this.postService.remove(+id);
  }
}
