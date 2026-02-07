import { Routes } from '@angular/router';
import { MessageList } from './components';

export const CHAT_ROUTES: Routes = [
  { path: '', redirectTo: '/chats', pathMatch: 'full' },
  {
    path: 'chats',
    loadComponent: () =>
      import('./layouts/chat-history-layout/chat-history-layout').then((m) => m.ChatHistoryLayout),
    children: [
      {
        path: ':userId',
        component: MessageList,
      },
    ],
  },
];
