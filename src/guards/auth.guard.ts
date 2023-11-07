/* eslint-disable no-unused-vars, no-useless-constructor, no-empty-function */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const { authorization }: { authorization: string } = context.switchToHttp().getRequest().headers;

    const token = authorization ? authorization.split(' ')[1] : '';

    return this.authService.isValidToken(token);
  }
}
