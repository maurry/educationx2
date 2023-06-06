import { Posts } from 'src/posts/entities/posts.entity';
import { Comment } from 'src/comments/entitites/comments.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User{
  @PrimaryGeneratedColumn({name:'user_id'})
  id:number;
  @Column()
  name: string;
  @Column()
  user_name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  about_me: string;

  @OneToMany(() => Comment, (comment) => comment.user, {onDelete:'CASCADE'})
  @JoinTable({
    name: 'user_comment',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'comment_id' }, 
  })
  comments: Comment[];

  @OneToMany(() => Posts, (posts) => posts.user, {onDelete:'CASCADE'}) 
  @JoinTable({
    name: 'user_post',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'post_id' },
  })
  posts: Posts[];

}