import { inject, Injectable } from '@angular/core';
import { AuthRepository } from '../repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authRepository = inject(AuthRepository);

  login(payload: { username: string; password: string }): Observable<string> {
    return this.authRepository.login(payload);
  }
}
