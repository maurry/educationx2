import { Module } from '@nestjs/common';
import { User } from './entities/users.entity';
import { Posts } from 'src/posts/entities/posts.entity';
import { Comment } from 'src/comments/entitites/comments.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [DatasourceModule,
      TypeOrmModule.forFeature([User, Comment, Posts]),
      JwtModule.registerAsync({
        imports:[ConfigModule],
        useFactory:(configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET')
        }),
        inject: [ConfigService]
      }),
    ],
  })
  export class UsersModule {}