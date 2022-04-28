import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { EntityFactory } from 'src/database/entity.factory';
import { UserEntityRepository } from './db/user-entity.repository';
import { UserCreatedEvent } from './events/user.created.event';
import { User } from './User';

@Injectable()
export class UserFactory implements EntityFactory<User> {
  constructor(private readonly userEntityRepository: UserEntityRepository) {}

  async create(name: string, age: number): Promise<User> {
    const user = new User(new ObjectId().toHexString(), name, age);
    await this.userEntityRepository.create(user);
    user.apply(new UserCreatedEvent(user.getId()));
    return user;
  }
}
