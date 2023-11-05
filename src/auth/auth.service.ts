/* eslint-disable no-unused-vars, no-useless-constructor, no-empty-function */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: User) {
    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
        name: user.name,
      }),
    };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) throw new UnauthorizedException('Email e/ou senha incorretos');

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException('Email invalido');

    return user;
  }

  async reset(password: string) {
    // TODO Validar Token
    const user = await this.prisma.user.update({
      where: {
        id: 0,
      },
      data: { password },
    });

    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}
