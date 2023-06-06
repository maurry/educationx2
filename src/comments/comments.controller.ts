import { CommentService } from 'src/comments/comments.service';
import { CreateCommentDto } from './dto/CommentDTO';
import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { Comment} from './entitites/comments.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  findAll()
  {
      return this.commentService.findAll();
  }

  @Get(":id")
  @UsePipes(new ValidationPipe())
  findOne(@Param("id") id: string)
  {
      return this.commentService.findOne(+id);
  }
  
  @Put(":id")
  @UsePipes(new ValidationPipe())
  update(@Param("id") id: string, @Body() updateComment: Comment)
  {
      return this.commentService.update(+id, updateComment);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createCommentDto: CreateCommentDto)
  {
      return this.commentService.create(createCommentDto);
  }

  @Delete(":id")
  @UsePipes(new ValidationPipe())
  remove(@Param("id") id: string)
  {
      return this.commentService.remove(+id);
  }
}
