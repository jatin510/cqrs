import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { UserCommandHandlers } from './commands';
import { UserEntityRepository } from './db/user-entity.repository';
import { UserSchemaFactory } from './db/user-schema.factory';
import { UserSchema } from './db/user.schema';
import { UserEventHandler } from './events';
import { UserFactory } from './user.factory';
import { UsersController } from './users.controller';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: UserSchema.name,
        schema: SchemaFactory.createForClass(UserSchema),
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UserEntityRepository,
    UserSchemaFactory,
    UserFactory,
    ...UserCommandHandlers,
    ...UserEventHandler,
  ],
})
export class UsersModule {}
