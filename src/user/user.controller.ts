import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';

@Controller('users')
export class UserController {
  constructor() {}

  @Post()
  async create(@Body() body: CreateUserDTO) {
    return { body };
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
  async put(@Body() body, @Param() params) {
    return { params };
  }
  @Patch(':id')
  async patch(@Body() body, @Param() params) {
    return { params };
  }
  @Delete(':id')
  async delete(@Param() params) {
    return { params };
  }
}
