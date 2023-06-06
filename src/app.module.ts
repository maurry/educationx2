import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { PostsModule } from './Posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    UsersModule, 
    DatasourceModule, 
    PostsModule, 
    CommentsModule,
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', //тип подключаемой БД
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: false, //отключаем автосинхронизацию(в противном случае при каждом перезапуске наша БД будет создаваться заново)
        logging: 'all', //включим логирование для удобства отслеживания процессов
        entities: ['dist/**/*.entity{.ts,.js}'], //указываем путь к сущностям
      }),
      inject: [ConfigService]
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
