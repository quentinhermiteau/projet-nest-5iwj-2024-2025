import { Controller, Param, Put } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { TokensService } from './tokens.service';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Public()
  @Put('validate/:token')
  validate(@Param('token') token: string) {
    return this.tokensService.validate(token);
  }
}
