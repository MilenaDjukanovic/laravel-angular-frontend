import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private baseArticleURL = 'laravel';

  constructor(private httpClient: HttpClient) {}

  public getArticlesForUser(): Observable<any> {
    const user = 4;
    const url = this.baseArticleURL + '/api/articles/' + user;

    return this.httpClient.get(url);
  }
}
