import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2'
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {}
    async validateUser(email: string, password: string) {
        const user = await this.userService.findEmail(email);
        const passwordIsMatch = await argon2.verify(user.password, password)
        if (user && passwordIsMatch) {
          return user;
        }
        throw new BadRequestException('Логин или пароль неверны')
    }
    async login(user: IUser) {
        
        const { id, email } = user
        return {
            id,
            email,
            token: this.jwtService.sign({id: user.id, email: user.email}),
        }
    }
}
