import { Component, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UsersStore } from 'features/messages/state/users.store';
import { AuthStore, DisplayUser } from 'core/auth';
import { ChatsFacade } from 'features/messages/state/chats.facade';
import { SharedModule } from '@shared';
import { CommonModule } from '@angular/common';
import { UserMedia } from 'features/messages/components';

@Component({
  selector: 'app-chat-history-layout',
  imports: [CommonModule, RouterModule, MatIconModule, SharedModule, UserMedia],
  templateUrl: './chat-history-layout.html',
  styleUrl: './chat-history-layout.scss',
  providers: [ChatsFacade],
})
export class ChatHistoryLayout {
  readonly currentUser = computed(() => this.authStore.user());
  readonly users = computed(() =>
    this.usersStore.users().filter((u) => u.id !== this.authStore.user()?.id),
  );

  constructor(
    private usersStore: UsersStore,
    private authStore: AuthStore,
    private facade: ChatsFacade,
  ) {}

  isActiveUser = (userId: number) => userId === this.facade.activeUserId();

  isOffline = (user: DisplayUser) => this.usersStore.isOffline(user);
}
