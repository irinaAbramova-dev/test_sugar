import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInterface } from './user.interface';

type Field = keyof UserInterface;

export const HttpUser = createParamDecorator<
  Field,
  ExecutionContext,
  UserInterface | UserInterface[Field]
>((field, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  if (field) {
    return user[field];
  }
  return user;
});
