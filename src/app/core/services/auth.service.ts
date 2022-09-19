import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map ,  distinctUntilChanged } from 'rxjs/operators';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { AutoFetchService } from './autoFetch.service';


@Injectable()
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  public socket:Socket;
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  
  constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private autoFetch:AutoFetchService
  ) {}

  setUserData() {
    if (this.jwtService.getToken()) {
      this.setAuth(JSON.parse(localStorage.getItem('login')))
    } else {
      this.removeUserData();
    }
  }

  setAuth(user: User) {
    this.jwtService.saveToken(user.accessToken);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  setAutoFetch(value){
    this.autoFetch.saveFetch(value);
  }

  removeUserData() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  loginUser(payload): Observable<User> {
    return this.apiService.post('/signin', payload)
      .pipe(map(
      data => {
        console.log(data)
        localStorage.setItem('login',JSON.stringify(data));
        this.setAuth(data);
        this.setAutoFetch(true);
        return data;
      }
    ));
  }

  registerUser(payload): Observable<User> {
    return this.apiService.post('/register', payload)
      .pipe(map(
      data => {
        console.log(data)        
        return data;
      }
    ));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
  
  connectSocket(){
    this.socket = io(environment.socket_url);
  }

  disconnectSocket() {
    if (this.socket) {
        this.socket.disconnect();
    }
}

}
