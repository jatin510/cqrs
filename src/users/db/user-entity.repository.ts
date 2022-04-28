import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseEntityRepository } from 'src/database/base-entity.repository';
import { User } from '../User';
import { UserSchemaFactory } from './user-schema.factory';
import { UserSchema } from './user.schema';

@Injectable()
export class UserEntityRepository extends BaseEntityRepository<
  UserSchema,
  User
> {
  constructor(
    @InjectModel(UserSchema.name) userModel: Model<UserSchema>,
    userSchemaFactory: UserSchemaFactory,
  ) {
    super(userModel, userSchemaFactory);
  }
}
