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

@Controller('users')
export class UserController {
  constructor() {}

  @Post()
  async create(@Body() body) {
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
