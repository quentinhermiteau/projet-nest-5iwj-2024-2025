import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CatsModule } from './cats/cats.module';
import { EmailService } from './email.service';
import { PrismaService } from './prisma.service';
import { TokensModule } from './tokens/tokens.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CatsModule,
    AuthModule,
    UsersModule,
    TokensModule,
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 1025,
      },
      defaults: {
        from: '"my-api" <my-api@contact.com>',
      },
    }),
  ],
  controllers: [],
  providers: [PrismaService, EmailService],
  exports: [PrismaService, EmailService],
})
export class AppModule {}
