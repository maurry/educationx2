import { Module } from '@nestjs/common';
import { Comment } from './entitites/comments.entity';
import { CommentService } from './comments.service';
import { CommentsController } from './comments.controller';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Posts } from 'src/posts/entities/posts.entity';

@Module({
    controllers: [CommentsController],
    providers: [CommentService],
    imports: [DatasourceModule,
    TypeOrmModule.forFeature([Comment, User, Posts]), 
    ],
  })
  export class CommentsModule {}