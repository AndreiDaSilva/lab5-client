import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, retry, switchMap, tap, timer} from 'rxjs';
import {ChatMessage, SendMessagePayload, User} from '../models/api-types';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
    private readonly API_URL = 'http://localhost:8080/api';

    private usersSubject = new BehaviorSubject<User[]>([]);
    public users$ = this.usersSubject.asObservable();

    constructor(private http: HttpClient) {}

    startUserPolling(myID: string, pass: string): Observable<User[]> {
      return timer(0, 6000).pipe(
        switchMap(() => this.http.get<User[]>(`${this.API_URL}/users`, {
          params: {id: myID, pass}
        })),
        tap(users => this.usersSubject.next(users)),
        retry(3),
      );
    }

    startMessagePolling(myId: string, pass: string): Observable<ChatMessage[]> {
      return timer(0, 2000).pipe(
        switchMap(() => this.http.get<ChatMessage[]>(`${this.API_URL}/messages`, {
          params: {id: myId, pass}
        }))
      )
    }

    sendMessage(payload: SendMessagePayload): Observable<any> {
      return this.http.post<ChatMessage[]>(`${this.API_URL}/messages`, payload);
    }
}
