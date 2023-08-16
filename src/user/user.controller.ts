import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { UpdateUserDTO } from './dto/update-user-dto';
import { PatchUserDTO } from './dto/patch-user-dto copy';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }
  @Get()
  async read() {
    return {};
  }
  @Get(':id')
  async readOne(@Param() params) {
    return { params };
  }
  @Put(':id')
  async put(@Body() body: UpdateUserDTO, @Param() params) {
    return { params };
  }
  @Patch(':id')
  async patch(@Body() body: PatchUserDTO, @Param() params) {
    return { params };
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return { id };
  }
}
