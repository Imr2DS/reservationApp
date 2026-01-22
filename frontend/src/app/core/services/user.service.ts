//user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/users';  // Proxy redirige vers API Gateway

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  login(email: string, motDePasse: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, motDePasse });
  }

  // =========================
  // Gestion du localStorage
  // =========================

  saveUser(user: any, token: string, role: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.clear();
  }
}
