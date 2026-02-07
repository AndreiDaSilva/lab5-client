import { computed, DestroyRef, effect, Injectable, signal } from '@angular/core';
import { UsersStore } from './users.store';
import { MessagesStore } from './messages.store';
import { AuthStore, UsersService } from 'core/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from '../services';
import { Message } from '../models';

@Injectable()
export class ChatsFacade {
  private _activeUserId = signal<number | null>(null);
  private _inputContent = signal<string>('');

  readonly activeUserId = this._activeUserId.asReadonly();
  readonly inputContent = this._inputContent.asReadonly();

  readonly isBroadcast = computed(() => this._activeUserId() === 0);

  readonly messageDraft = computed(() => ({
    senderId: this.authStore.user()?.id,
    targetId: this._activeUserId(),
    content: this._inputContent(),
  }));
  readonly activeChatMessages = computed(() => {
    const activeId = this._activeUserId();
    if (!activeId) return [];
    return this.messagesStore
      .messages()
      .filter((m) => m.senderId === activeId || m.receiverId === activeId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  });

  constructor(
    private destroyRef: DestroyRef,
    private authStore: AuthStore,
    private usersStore: UsersStore,
    private messagesStore: MessagesStore,
    private usersService: UsersService,
    private messageService: MessageService,
  ) {
    this.usersStore
      .loadUsersFrom(this.usersService.getOnlineUsers())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  sendMessage(message: Message) {
    this.messageService.send(message);
    this._inputContent.set('');
  }

  setActiveUser(userId: number) {
    this._activeUserId.set(userId);
  }
}
