import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Service()
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  signUp(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/users/signup`, data);
  }
  signIn(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/users/signin`, data);
  }
}
