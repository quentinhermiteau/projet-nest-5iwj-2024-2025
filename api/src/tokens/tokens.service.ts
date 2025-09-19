import { Injectable, NotFoundException } from '@nestjs/common';
import { UserStatus } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TokensService {
  constructor(private readonly prisma: PrismaService) {}

  async validate(token: string) {
    const foundToken = await this.prisma.token.findUnique({
      where: { id: token, isUsed: false },
    });

    console.log(token, foundToken);

    if (!foundToken) {
      throw new NotFoundException('Token not found');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.token.update({
        where: { id: token },
        data: { isUsed: true },
      });

      await tx.user.update({
        where: { id: foundToken.userId },
        data: { status: UserStatus.ACTIVE },
      });
    });

    return 'This action validates a token';
  }
}
