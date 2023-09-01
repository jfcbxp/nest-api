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
import { PatchUserDTO } from './dto/patch-user-dto ';
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
    return this.userService.list();
  }
  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.show(id);
  }
  @Put(':id')
  async put(@Param('id', ParseIntPipe) id: number, @Body() user: PatchUserDTO) {
    return this.userService.update(id, user);
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
