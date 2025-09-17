import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendValidationEmail(email: string, token: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Validation Token',
      text: `Your validation token is ${token}`,
    });
  }
}
