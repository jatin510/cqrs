import { UpdateUserDto } from 'src/users/dto';

export class UpdateUserCommand {
  constructor(public readonly updateUserDto: UpdateUserDto) {}
}
