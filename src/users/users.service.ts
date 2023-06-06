import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { Posts } from 'src/posts/entities/posts.entity';
import { Comment } from 'src/comments/entitites/comments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/UserDTO';
import { IncompleteUserDto } from './dto/incomplete-user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // "внедряем" репозиторий User в сервис
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>, // "внедряем" репозиторий Comment в сервис
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>, // "внедряем" репозиторий Artilcle в сервис
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User>
 {
    //получаем объект CreateUserDto
    const existUser = await this.userRepository.findOne({
      where: {
        email:createUserDto.email
      }
    })
    if (existUser) throw new BadRequestException('Эта почта уже существует')
    
    const user = this.userRepository.create(); //создаем объект User из репозитория
    user.name = createUserDto.name; //заполняем поля объекта User
    user.user_name = createUserDto.user_name;
    user.email = createUserDto.email;
    user.password = await argon2.hash(createUserDto.password)
    
    const comments = await this.commentRepository.findBy({
      id: In(createUserDto.comments),
    });
    user.comments = comments;

    const posts = await this.postsRepository.findBy({
      id: In(createUserDto.posts),
    });
    user.posts = posts;

    const token = this.jwtService.sign({ email: createUserDto.email })

    await this.userRepository.save(user); //сохраняем объект User в БД
    return user; //возвращаем объект User
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      //получаем связанные объекты
      relations: {
        comments: true,
        posts: true,
      },
    }); //получаем массив User из БД
    return users; //возвращаем массив User
  }

  findOne(id: number): Promise<User> {
    // Promise<User> - указывает, что функция возвращает объект User в виде Promise (c асинхронного потока)
    return this.userRepository.findOne({
      //получаем объект User по id
      where: { id }, //указываем условие поиска по id
      relations: { comments: true, posts: true }, //получаем связанные объекты
    });
  }
  
  findEmail(email:string):Promise<User> {
    return this.userRepository.findOne({
      where: {email}
    })
  }

  async findIncomplete(): Promise<IncompleteUserDto[]> {
    const users = await this.userRepository.find(); //получаем массив User из БД
    const incompleteUsers: IncompleteUserDto[] = users.map((user) => {
      //преобразуем массив User в массив IncompleteUserDto
      const incompleteUser = new IncompleteUserDto();
      incompleteUser.id = user.id;
      incompleteUser.name = user.name;
      return incompleteUser;
    });
    return incompleteUsers; //возвращаем массив IncompleteUserDto
  }

  async update(id: number, updatedUser: User) {
    //получаем объект User для обновления по id
    const user = await this.userRepository.findOne({ where: { id } }); //получаем объект User по id из БД
    user.name = updatedUser.name; //обновляем поля объекта User
    user.user_name = updatedUser.user_name;
    user.email = updatedUser.email;
    user.password = updatedUser.password;
    user.about_me = updatedUser.about_me;
    user.comments = updatedUser.comments;
    user.posts = updatedUser.posts;
    await this.userRepository.save(user); //сохраняем объект User в БД
    return user; //возвращаем объект User
  }

  remove(id: number) {
    this.userRepository.delete({ id }); //удаляем объект User из БД
  }
}
