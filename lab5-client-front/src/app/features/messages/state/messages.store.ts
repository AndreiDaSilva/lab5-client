import { effect, Injectable, signal } from '@angular/core';
import { Message } from '../models';
import { MessageService } from '../services';

@Injectable({ providedIn: 'root' })
export class MessagesStore {
  private readonly _messages = signal<Message[]>([]);

  readonly messages = this._messages.asReadonly();

  constructor(private messageService: MessageService) {
    effect(() => {
      const lastMessage = this.messageService.lastMessage();
      if (!lastMessage) return;
      const existent = this._messages().find(
        (m) =>
          m.content === lastMessage.content &&
          m.senderId === lastMessage.senderId &&
          m.receiverId === lastMessage.receiverId,
      );
      if (existent) return;
      this.addMessage(lastMessage);
    });
  }

  addMessage(message: Message): void {
    this._messages.update((messages) => [...messages, message]);
  }
}
