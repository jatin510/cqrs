import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create.user.command';
import { UpdateUserCommand } from './commands/impl/update.user.command';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersQuery } from './queries/impl/users.query';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.commandBus.execute<CreateUserCommand, void>(
      new CreateUserCommand(createUserDto),
    );
  }

  @Patch('')
  async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<void> {
    await this.commandBus.execute<UpdateUserCommand, void>(
      new UpdateUserCommand(updateUserDto),
    );
  }

  @Get('')
  async getAllUsers(): Promise<Partial<UserDto>[]> {
    return this.queryBus.execute<UsersQuery, Partial<UserDto>[]>(
      new UsersQuery(),
    );
  }
}
