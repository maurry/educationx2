import { Posts } from 'src/posts/entities/posts.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comments')
export class Comment{
  @PrimaryGeneratedColumn({name:'comment_id'})
  id:number;
  @Column()
  author: string;
  @Column()
  user_name: string;
  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinTable({
    name: 'user_comment',
    joinColumn: { name: 'comment_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  user: User;

  @ManyToOne(()=>Posts, (post)=>post.comments)
  @JoinTable({
    name: 'post_comment',
    joinColumn: { name: 'comment_id' },
    inverseJoinColumn: { name: 'post_id' },
  })
  post: Posts;

}

