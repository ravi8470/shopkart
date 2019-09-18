import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    // console.log(this.currentUserSubject);
    return this.currentUserSubject.value;
  }
  isEmailUnique(email) {
    return this.http.post('http://localhost:3333/api/auth/isemailunique', { email })
  }

  login(email, password) {
    return this.http.post('http://localhost:3333/api/auth/login', { email, password }).pipe(
      catchError(e => {
        console.log(e);
        if (e.status === 401) {
          return of('Unauthorized')
        }
        // do any other checking for statuses here
      })
    )
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login'])
  }
  signup(name, email, password): Observable<any> {
    // this.http.get('http://localhost:3333/api/auth/check',{responseType: 'text'}).subscribe((x: any) => console.log(x))
    return this.http.post<any>('http://localhost:3333/api/auth/signup', {
      name, email, password
    }, httpOptions)
  }
}
