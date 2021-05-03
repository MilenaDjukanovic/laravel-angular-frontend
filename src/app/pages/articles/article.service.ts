import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private baseArticleURL = 'laravel';
  private user = this.authService.getCurrentUserValue();

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  public getArticlesForUser(): Observable<any> {
    const url = this.baseArticleURL + '/api/articles/' + this.user.id;

    return this.httpClient.get(url);
  }

  public createArticle(title: string, body: string): Observable<any> {
    const url = this.baseArticleURL + '/api/article';
    const data = {title, body, user_id: this.user.id};

    return this.httpClient.post(url, data);
  }

  public deleteArticle(id: number): Observable<any> {
    const url = this.baseArticleURL + '/api/article/' + id;
    return this.httpClient.delete(url);
  }

  public editArticle(id: number, title: string, body: string): Observable<any>{
    const url = this.baseArticleURL + '/api/article2';
    const data = { id, title, body, user_id: this.user.id };
    return this.httpClient.put(url, data);
  }
}
