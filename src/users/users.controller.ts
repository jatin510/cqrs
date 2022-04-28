import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create.user.command';
import { CreateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    console.log(createUserDto);
    await this.commandBus.execute<CreateUserCommand, void>(
      new CreateUserCommand(createUserDto),
    );
  }
}
