import { UserDto } from "./dto/user.dto";

export class User {
  readonly id: number;
  readonly name: string;
  readonly wins: number;

  constructor(data: UserDto) {
    this.id = data.id;
    this.name = data.name;
    this.wins = data.wins;
  }
}