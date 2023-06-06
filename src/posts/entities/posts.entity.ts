import { User } from 'src/users/entities/users.entity';
import { Comment } from 'src/comments/entitites/comments.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('posts')
export class Posts{
  @PrimaryGeneratedColumn({name:'post_id'})
  id:number;
  @Column()
  name: string;
  @Column()
  user_name: string;
  @Column()
  topic: string;
  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinTable({
    name: 'user_post',
    joinColumn: { name: 'post_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post, {onDelete:'CASCADE'})
  @JoinTable({
    name: 'post_comment',
    joinColumn: { name: 'post_id' },
    inverseJoinColumn: { name: 'comment_id' }, 
  })
  comments: Comment[];
}
