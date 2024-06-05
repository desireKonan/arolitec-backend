import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { verifyPassword } from 'src/util/utils';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}


    async signIn(username: string, pass: string) {
        const user = await this.userService.findUser(username);
        const passwordIsCorrect = await verifyPassword(pass, user.password);
        if (!passwordIsCorrect) {
            throw new UnauthorizedException("Password is incorrect ! Plz try with new Password !");
        }
        const payload = { sub: user.id, username: user.email };
        return {
            email: user.email,
            userId: user.id,
            name: user.name,
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}