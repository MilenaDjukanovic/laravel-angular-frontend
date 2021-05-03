import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../components/common/user/user.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUserURL = 'laravel';

  private readonly LOCAL_STORAGE_USER: string = 'currentUser';

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private user!: User;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_USER) || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem(this.LOCAL_STORAGE_USER);
  }

  public getCurrentUserValue(): User {
    return this.currentUserSubject.getValue();
  }

  public register(name: string, email: string, password: string): Observable<any> {
    const url = this.baseUserURL + '/api/register';
    const data = {name, email, password};
    return this.httpClient.post(url, data);
  }

  public login(email: string, password: string): Observable<any> {
    const url = this.baseUserURL + '/api/login';
    const data = {email, password};

    return this.httpClient.post(url, data).pipe(
      map(user => {
        // adding user to local storage
        localStorage.setItem(this.LOCAL_STORAGE_USER, JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  public logout(): Observable<any> {
    // removing user form local storage
    this.user = this.currentUserSubject.getValue();
    localStorage.removeItem(this.LOCAL_STORAGE_USER);
    this.currentUserSubject.next(null);

    const url = this.baseUserURL + '/api/logout';
    const headers = new HttpHeaders()
      .set('x-auth-token', this.user.api_token);

    return this.httpClient.post(url, '', {headers, responseType: 'text'});
  }

}
