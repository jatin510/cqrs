import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserDto } from 'src/users/user.dto';
import { UserDtoRepository } from '../../db/user-dto.repository';
import { UsersQuery } from '../impl/users.query';

@QueryHandler(UsersQuery)
export class UsersHandler implements IQueryHandler<UsersQuery> {
  constructor(private readonly userDtoRepository: UserDtoRepository) {}
  async execute(): Promise<Partial<UserDto>[]> {
    return this.userDtoRepository.findAll();
  }
}
