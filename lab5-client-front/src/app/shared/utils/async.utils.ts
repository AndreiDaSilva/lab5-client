import { WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

export interface AsyncState<T> {
  data: T;
  isLoading: boolean;
  error: any;
}

export function initialAsyncState<T>(initialValue: T): AsyncState<T> {
  return {
    data: initialValue,
    isLoading: true,
    error: null,
  };
}

export function hydrateSignalFrom$<T>(
  signal: WritableSignal<AsyncState<T>>,
  source$: Observable<T>,
) {
  signal.set({ ...signal(), isLoading: true });

  source$.subscribe({
    next: (value: T) =>
      signal.set({
        data: value,
        isLoading: false,
        error: null,
      }),
    error: (err) => signal.set({ ...signal(), isLoading: false, error: err }),
  });
  return source$;
}
