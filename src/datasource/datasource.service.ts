import { Injectable } from '@nestjs/common';
import { Posts } from 'src/posts/entities/posts.entity';
import {Comment} from 'src/comments/entitites/comments.entity'
import {User} from 'src/users/entities/users.entity'

@Injectable()
export class DatasourceService {
  private posts: Posts[] = [];
  private users: User[] = [];
  private comments: Comment[] = [];

  getPosts(): Posts[] {
    return this.posts;
  }
  getComments(): Comment[]{
    return this.comments;
  }
  getUsers(): User[]{
    return this.users;
  }

  getIncompleteUsers(): User[]{
    return 
  }
}