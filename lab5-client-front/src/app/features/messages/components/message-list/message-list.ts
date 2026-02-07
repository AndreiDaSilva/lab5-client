import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../models';
import { ChatsFacade, UsersStore } from '../../state';
import { map } from 'rxjs';

interface HeaderValue {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-message-list',
  imports: [MatIconModule, CommonModule],
  templateUrl: './message-list.html',
  styleUrl: './message-list.scss',
})
export class MessageList {
  readonly messages = computed(() => this.facade.activeChatMessages());

  readonly header = computed(() => {
    const activeId = this.facade.activeUserId();
    if (activeId == null) return;

    const icon = this.facade.isBroadcast() ? 'campaign' : 'person';
    const label = this.facade.isBroadcast() ? 'Todos' : this.usersStore.getUser(activeId)?.name;
    return { label, icon } as HeaderValue;
  });

  constructor(
    private route: ActivatedRoute,
    public facade: ChatsFacade,
    private usersStore: UsersStore,
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(map((params) => params.get('userId'))).subscribe((userId) => {
      this.facade.setActiveUser(Number(userId));
    });
  }

  sentByMe = (message: Message) => message.senderId === 1111//this.authStore.user()?.id;
}
