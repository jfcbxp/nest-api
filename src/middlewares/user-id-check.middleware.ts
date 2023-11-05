/* eslint-disable import/no-extraneous-dependencies */
import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: NextFunction) => void) {
    if (Number.isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      throw new BadRequestException('Id invalido');
    }
    next();
  }
}
