import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatMessage, User} from '../../core/models/api-types';
import {Subscription} from 'rxjs';
import {ChatService} from '../../core/services/chat.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  myId: string = '1234'
  myPass: string = 'senha123'

  users: User[] = []

  messages: ChatMessage[] = []
  selectedUser: User | null = null

  newMessage = ''
  private subs = new Subscription()

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.subs.add(
      this.chatService.startUserPolling(this.myId, this.myPass)
        .subscribe(users => this.users = users)
    );

    this.subs.add(
      this.chatService.startMessagePolling(this.myId, this.myPass)
        .subscribe(newMsgs => {
          if (newMsgs && newMsgs.length > 0) {
            this.messages = [...this.messages, ...newMsgs];
            this.scrollToBottom();
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  selectUser(user: User | null) {
    this.selectedUser = user;
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const targetId = this.selectedUser ? this.selectedUser.id : '0';

    this.chatService.sendMessage({
      senderId: this.myId,
      pass: this.myPass,
      targetId: targetId,
      msg: this.newMessage
    }).subscribe({
      next: () => {
        // Adiciona otimistamente na tela
        this.messages.push({
          senderId: this.myId,
          content: this.newMessage,
          timestamp: new Date(),
          isSystem: false
        });
        this.newMessage = '';
        this.scrollToBottom();
      },
      error: (err) => console.error('Erro ao enviar UDP', err)
    });
  }

  private scrollToBottom() {
    setTimeout(() => {
      const chatContainer = document.getElementById('chat-history');
      if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 100);
  }

  getTargetName(): string {
    return this.selectedUser ? `Privado para ${this.selectedUser.name}` : 'Chat Geral';
  }

}
