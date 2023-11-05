/* eslint-disable no-unused-vars, no-useless-constructor, no-empty-function */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user-dto';
import { PatchUserDTO } from './dto/patch-user-dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, email, password }: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }

  async list() {
    return this.prisma.user.findMany({
      where: {
        email: {
          contains: '@',
        },
      },
    });
  }

  async show(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, user: PatchUserDTO) {
    return this.prisma.user.update({
      data: user,
      where: {
        id,
      },
    });
  }
}
