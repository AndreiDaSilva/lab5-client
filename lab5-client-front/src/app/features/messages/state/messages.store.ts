import { effect, Injectable, signal } from '@angular/core';
import { Message } from '../models';
import { MessageService } from '../services';

@Injectable({ providedIn: 'root' })
export class MessagesStore {
  private readonly _messages = signal<Message[]>([
    new Message({ senderId: 6201, receiverId: 1111, content: 'Oi! Tudo bem?' }),
    new Message({ senderId: 1111, receiverId: 6201, content: 'Tudo certo! E contigo?' })
  ]);

  readonly messages = this._messages.asReadonly();

  constructor(private messageService: MessageService) {
    effect(() => {
      const lastMessage = this.messageService.lastMessage();
      if (!lastMessage) return;
      this.addMessage(lastMessage);
    });
  }

  addMessage(message: Message): void {
    this._messages.update((messages) => [...messages, message]);
  }
}
