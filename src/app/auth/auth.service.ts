import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  tap,
  throwError,
} from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  token: string = '';
  user = new BehaviorSubject<User | any>(null);
  private tokenExperationTimer: number | any;
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCbDc-D7vIcTKrnfPRWog1q_Mgv2iNMNow',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((data) =>
          this.handleAuthentication(
            data.email,
            data.localId,
            data.idToken,
            +data.expiresIn
          )
        )
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCbDc-D7vIcTKrnfPRWog1q_Mgv2iNMNow',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((data) =>
          this.handleAuthentication(
            data.email,
            data.localId,
            data.idToken,
            +data.expiresIn
          )
        )
      );
  }

  autoLogin() {
    let user = localStorage.getItem('userData');
    if (!user) {
      return;
    }
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(user);
    const loaderUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loaderUser.token) {
      this.user.next(loaderUser);
      const experationTime =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(experationTime * 1000);
    }
  }

  autoLogout(experationTimeout: number) {
    this.tokenExperationTimer = setTimeout(() => {
      this.logOut();
    }, experationTimeout);
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExperationTimer) {
      clearTimeout(this.tokenExperationTimer);
    }
    this.tokenExperationTimer = null;
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const users = new User(email, userId, token, expirationDate);
    this.user.next(users);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(users));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let defaultError = 'An unknown Error occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(defaultError);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        defaultError = 'Email already exists';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        defaultError = 'Your email or password is wrong';
        break;
      case 'MISSING_PASSWORD':
        defaultError = 'Your email or password is wrong';
        break;
      case 'EMAIL_NOT_FOUND':
        defaultError = 'Your email is not exists';
        break;
    }
    return throwError(defaultError);
  }
}
