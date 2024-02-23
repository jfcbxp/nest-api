import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user-dto';
import { PatchUserDTO } from './dto/patch-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, email, password }: CreateUserDTO) {
    password = await bcrypt.hash(password, await bcrypt.genSalt());
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
    user.password ? await bcrypt.hash(user.password, await bcrypt.genSalt()) : user.password;
    return this.prisma.user.update({
      data: user,
      where: {
        id,
      },
    });
  }
}
