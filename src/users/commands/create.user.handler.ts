import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserFactory } from '../user.factory';
import { CreateUserCommand } from './create.user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly eventPublisher: EventPublisher,
  ) {
    console.log('cuc');
  }

  async execute({ createUserDto }: CreateUserCommand): Promise<void> {
    console.log('hello');
    const { name, age } = createUserDto;

    const user = this.eventPublisher.mergeObjectContext(
      await this.userFactory.create(name, age),
    );

    user.commit();
  }
}
