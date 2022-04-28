import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { EntitySchemaFactory } from 'src/database/entity-schema.factory';
import { User } from '../User';
import { UserSchema } from './user.schema';

@Injectable()
export class UserSchemaFactory
  implements EntitySchemaFactory<UserSchema, User>
{
  create(user: User): UserSchema {
    return {
      _id: new ObjectId(user.getId()),
      name: user.getName(),
      age: user.getAge(),
    };
  }
  createFromSchema(userSchema: UserSchema): User {
    return new User(
      userSchema._id.toHexString(),
      userSchema.name,
      userSchema.age,
    );
  }
}
