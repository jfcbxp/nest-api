import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken() {}

  async checkToken(token: string) {}

  async login(email: string, password: string) {
    let user = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) throw new UnauthorizedException('Email e/ou senha incorretos');

    return user;
  }

  async forget(email: string) {
    let user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException('Email invalido');

    return user;
  }

  async reset(password: string, token: string) {
    let id = 0;

    await this.prisma.user.update({
      where: {
        id,
      },
      data: { password },
    });
  }
}
