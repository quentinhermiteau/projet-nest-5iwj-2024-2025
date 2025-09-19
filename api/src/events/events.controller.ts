import { Controller, Sse } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';
import { Public } from 'src/decorators/public.decorator';

@Controller('events')
export class EventsController {
  @Public()
  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map(() => ({ data: { message: 'Hello World' } }) as MessageEvent),
    );
  }
}
