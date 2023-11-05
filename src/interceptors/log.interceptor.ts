/* eslint-disable @typescript-eslint/no-explicit-any, no-console */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dt = Date.now();

    return next.handle().pipe(
      tap({
        next: (x) => {
          const request = context.switchToHttp().getRequest();
          console.log(`Url ${request.url}`);
          console.log(`Execução levou ${Date.now() - dt}`);
        },
        error: (err) => {
          console.error(err);
        },
      }),
    );
  }
}
