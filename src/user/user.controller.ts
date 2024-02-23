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
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from 'src/guards/role.guard';
import { ParamId } from '../decorators/param-id.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { CreateUserDTO } from './dto/create-user-dto';
import { PatchUserDTO } from './dto/patch-user-dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(LogInterceptor)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }

  @Get()
  async read() {
    return this.userService.list();
  }

  @Get(':id')
  async readOne(@ParamId() id: number) {
    return this.userService.show(id);
  }

  @UseInterceptors(LogInterceptor)
  @Put(':id')
  async put(@Param('id', ParseIntPipe) id: number, @Body() user: PatchUserDTO) {
    return this.userService.update(id, user);
  }

  @Patch(':id')
  async patch(@Body() body: PatchUserDTO, @Param() params: string[]) {
    return { params };
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}
