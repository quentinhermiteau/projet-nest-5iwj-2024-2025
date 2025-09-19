import { Body, Controller, Get, HttpCode, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

import { Public } from 'src/decorators/public.decorator';
import { type RequestWithUser } from './auth.guard';
import { AuthService, type PayloadUser } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/sign-in.dto';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Connected',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(201)
  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'Registered',
  })
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return user;
  }

  @Get('profile')
  getProfile(@Request() req: RequestWithUser): PayloadUser {
    return req.user;
  }
}
