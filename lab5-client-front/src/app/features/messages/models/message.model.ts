import { MessageDto } from "./dto/message.dto";

export class Message {
  readonly senderId: number;
  readonly receiverId: number;
  readonly content: string;
  readonly createdAt: Date;

  constructor(data: MessageDto) {
    this.senderId = data.senderId;
    this.receiverId = data.receiverId;
    this.content = data.content;
    this.createdAt = new Date();
  }
}
