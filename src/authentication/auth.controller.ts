import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/util/public.annotation';

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    @HttpCode(HttpStatus.OK)
    @Post('/login')
    @ApiOperation({
        summary: 'Authentify an User',
        description: 'Authentify an User',
    })
    @ApiBody({
        type: AuthDto,
    })
    @ApiResponse({
        status: 200,
    })
    @Public()
    async signIn(@Body() signInDto: AuthDto) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }
}