import { Module } from '@nestjs/common';
import { Posts } from './entities/posts.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Comment } from 'src/comments/entitites/comments.entity';

@Module({
    controllers: [PostsController],
    providers: [PostsService],
    imports: [DatasourceModule,
    TypeOrmModule.forFeature([Posts, User, Comment]), 
    ],
  })
  export class PostsModule {}