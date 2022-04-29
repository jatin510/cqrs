import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserEntityRepository } from 'src/users/db/user-entity.repository';
import { UpdateUserCommand } from '../impl/update.user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly userEntityRepository: UserEntityRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ updateUserDto }: UpdateUserCommand): Promise<void> {
    const { userId, name, age } = updateUserDto;

    const user = this.eventPublisher.mergeObjectContext(
      await this.userEntityRepository.findOneById(userId),
    );

    if (name) {
      user.updateUserName(name);
    }

    if (age) {
      user.updateUserAge(age);
    }

    await this.userEntityRepository.findOneAndReplaceById(userId, user);
    user.commit();
  }
}
