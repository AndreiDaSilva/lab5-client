import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments';
import { map, Observable } from 'rxjs';
import { User, UserDto } from '../models';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getOnlineUsers(): Observable<User[]> {
    return this.http
      .get<UserDto[]>(this.apiUrl)
      .pipe(map((users) => users.map((dto) => new User(dto))));
  }
}
