import { computed, Injectable, signal } from '@angular/core';
import { User } from 'core/auth/models';
import { AsyncState, hydrateSignalFrom$, initialAsyncState } from '@shared';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  private readonly _usersState = signal<AsyncState<User[]>>(
    initialAsyncState<User[]>([new User({ id: 6201, name: 'Marlon Sbardelatti', wins: 0 })]),
  );

  readonly usersState = this._usersState.asReadonly();

  readonly users = computed(() => this._usersState().data);
  readonly isLoading = computed(() => this._usersState().isLoading);
  readonly hasError = computed(() => !!this._usersState().error);

  loadUsersFrom(source$: Observable<User[]>): Observable<User[]> {
    return hydrateSignalFrom$(this._usersState, source$);
  }

  getUser(userId: number): User | null {
    return this._usersState().data.find((u) => u.id === userId) || null;
  }
}
