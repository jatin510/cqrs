import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private name: string,
    private age: number,
  ) {
    super();
  }
  getId(): string {
    return this._id;
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }

  updateUserAge(age: number): void {
    this.age = age;
  }

  updateUserName(name: string): void {
    this.name = name;
  }
}
