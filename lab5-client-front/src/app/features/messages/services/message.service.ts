import { computed, Injectable, signal } from "@angular/core";
import { Message } from "../models";

@Injectable({ providedIn: 'root' })
export class MessageService {
  private socket: WebSocket | null = null;

  readonly lastMessage = signal<Message | null>(null);
  readonly connectionOpened = computed(() => !!this.socket);

  connect() {
    if (this.socket) return;
    this.socket = new WebSocket(`'ws://localhost:8080/messages'`);

    this.socket.onmessage = (ev) => {
      const data = JSON.parse(ev.data);
      this.lastMessage.set(data);
    };

    this.socket.onclose = () => {
      setTimeout(() => this.connect(), 1000);
    };
  }

  send(message: Message) {
    this.socket?.send(JSON.stringify(message));
  }
}