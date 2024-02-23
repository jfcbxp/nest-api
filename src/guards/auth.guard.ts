import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization }: { authorization: string } = request.headers;

    const token = authorization ? authorization.split(' ')[1] : '';

    if (token) {
      const data = this.authService.checkToken(token);

      request.user = await this.userService.show(data.sub);
    }
    return this.authService.isValidToken(token);
  }
}
