import { ObjectId } from 'mongodb';

export class UserDto {
  readonly _id: ObjectId;
  readonly name: string;
  readonly age: number;
  readonly isAdult: boolean;
}
