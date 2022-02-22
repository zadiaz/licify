import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:5001/api/'

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signUp(user: any) {
    return this.http.post<any>(this.URL + 'users/login', user)
  }

  signIn(user: any) {
    return this.http.post<any>(this.URL + 'users', user)
  }

  logged(): Boolean {
    return !!localStorage.getItem('token')
  }

  getToken(): any {
    return localStorage.getItem('token') ? localStorage.getItem('token') : ''
  }
  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/signup'])

  }

}
