import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserFactory } from '../../user.factory';
import { CreateUserCommand } from '../impl/create.user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ createUserDto }: CreateUserCommand): Promise<void> {
    const { name, age } = createUserDto;

    const user = this.eventPublisher.mergeObjectContext(
      await this.userFactory.create(name, age),
    );

    user.commit();
  }
}
