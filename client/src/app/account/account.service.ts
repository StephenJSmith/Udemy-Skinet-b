import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of, ReplaySubject } from 'rxjs';
import { IUser } from '../shared/_models/user';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  loadCurrentUser(token: string) {
    if (token === null) {
      this.currentUserSource.next(null);

      return of(null);
    }

    let headers = new HttpHeaders();
    const bearerToken = `Bearer ${token}`;
    headers = headers.set('Authorization', bearerToken);
    const url = `${this.baseUrl}account`;

    return this.http.get(url, {headers})
    .pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  login(values: any) {
    var url = `${this.baseUrl}account/login`;

    return this.http.post(url, values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(values: any) {
    var url = `${this.baseUrl}account/register`;

    return this.http.post(url, values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    var url = `${this.baseUrl}account/emailexists?email=${email}`;

    return this.http.get(url);
  }
}
