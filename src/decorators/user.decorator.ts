import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((filter: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  return request.user;
});