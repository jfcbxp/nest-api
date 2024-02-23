import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Throttle({
    default: {
      limit: 10,
      ttl: 60,
    },
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(ThrottlerGuard)
  @Post()
  setHello(): string {
    return 'POST: HELLO';
  }
}
