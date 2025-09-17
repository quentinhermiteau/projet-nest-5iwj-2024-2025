import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { TokenType } from 'generated/prisma';
import { EmailService } from 'src/email.service';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

export interface PayloadUser {
  sub: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email } as PayloadUser;

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new BadRequestException();
    }

    const password = await bcrypt.hash(registerDto.password, 10);

    const { user, token } = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: registerDto.email,
          password,
        },
      });

      const token = await tx.token.create({
        data: {
          type: TokenType.VALIDATION,
          userId: user.id,
        },
      });

      return { user, token };
    });

    await this.emailService.sendValidationEmail(user.email, token.id);

    return user;
  }
}
