import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { Posts } from 'src/posts/entities/posts.entity';
import { Comment } from 'src/comments/entitites/comments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/PostDTO';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // "внедряем" репозиторий User в сервис
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>, // "внедряем" репозиторий Comment в сервис
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>, // "внедряем" репозиторий Artilcle в сервис
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Posts>
    {
       const post = this.postsRepository.create();
       post.name = createPostDto.name;
       post.topic = createPostDto.topic;
       post.text = createPostDto.text;
   
       await this.postsRepository.save(post);
       return post;
     }

  async findAll(): Promise<Posts[]> {
    const posts = await this.postsRepository.find({
      relations: {
        user: true,
        comments: true,
      },
    });
    return posts;
  }

  findOne(id: number): Promise<Posts> {
    return this.postsRepository.findOne({
      where: { id },
      relations: { user: true, comments: true },
    });
  }

  async update(id: number, updatedPost: Posts) {
    //получаем объект User для обновления по id
    const post = await this.postsRepository.findOne({ where: { id } }); //получаем объект User по id из БД
    post.name = updatedPost.name; //обновляем поля объекта User
    post.user_name = updatedPost.user_name;
    post.topic = updatedPost.topic;
    post.text = updatedPost.text;
    await this.postsRepository.save(post); //сохраняем объект User в БД
    return post; //возвращаем объект User
  }

  remove(id: number) {
    this.postsRepository.delete({ id }); //удаляем объект User из БД
  }
}
