import { Component, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UsersStore } from 'features/messages/state/users.store';
import { User } from 'core/auth';
import { ChatsFacade } from 'features/messages/state/chats.facade';
import { SharedModule } from '@shared';

@Component({
  selector: 'app-chat-history-layout',
  imports: [RouterModule, MatIconModule, SharedModule],
  templateUrl: './chat-history-layout.html',
  styleUrl: './chat-history-layout.scss',
  providers: [ChatsFacade]
})
export class ChatHistoryLayout {
  readonly users = computed(() => this.usersStore.users());

  constructor(private usersStore: UsersStore, private facade: ChatsFacade) {}

  isActiveUser = (userId: number) => userId === this.facade.activeUserId();
}
