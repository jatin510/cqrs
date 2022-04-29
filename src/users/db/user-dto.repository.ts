import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../user.dto';
import { UserSchema } from './user.schema';

@Injectable()
export class UserDtoRepository {
  constructor(
    @InjectModel(UserSchema.name) private readonly userModel: Model<UserSchema>,
  ) {}

  async findAll(): Promise<Partial<UserDto>[]> {
    const users = await this.userModel.find({}, {}, { lean: false });
    return users;
  }
}
