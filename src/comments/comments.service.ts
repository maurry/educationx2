import { Injectable, HttpStatus } from '@nestjs/common';
import { Comment } from './entitites/comments.entity';
import { DatasourceService } from 'src/datasource/datasource.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, In, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/CommentDTO';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class CommentService {
  constructor(private readonly datasourceService: DatasourceService,
    @InjectRepository(Comment)
    private readonly commentRepository:Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,) {}

    async create(createCommentDto: CreateCommentDto): Promise<Comment>
    {
       const comment = this.commentRepository.create();
       comment.text = createCommentDto.text;
   
       await this.commentRepository.save(comment);
       return comment;
     }

     async findAll(): Promise<Comment[]> {
      const comments = await this.commentRepository.find({
        //получаем связанные объекты
        relations: {
          user: true,
          post: true,
        },
      }); //получаем массив Comment из БД
      return comments; //возвращаем массив Comment
    }
  
    findOne(id: number): Promise<Comment> {
      // Promise<Comment> - указывает, что функция возвращает объект Comment в виде Promise (c асинхронного потока)
      return this.commentRepository.findOne({
        //получаем объект Comment по id
        where: { id }, //указываем условие поиска по id
        relations: { user: true, post: true }, //получаем связанные объекты
      });
    }
  
    async update(id: number, updatedComment: Comment) {
      //получаем объект Comment для обновления по id
      const comment = await this.commentRepository.findOne({ where: { id } }); //получаем объект Comment по id из БД
      comment.text = updatedComment.text; //обновляем поля объекта Comment

      await this.commentRepository.save(comment); //сохраняем объект Comment в БД
      return comment; //возвращаем объект Comment
    }
  
    remove(id: number) {
      this.commentRepository.delete({ id }); //удаляем объект Comment из БД
    }
}