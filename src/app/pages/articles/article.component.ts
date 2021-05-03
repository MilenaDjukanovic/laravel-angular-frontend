import {Component, OnInit} from '@angular/core';
import {Article} from './article.model';
import {ArticleService} from './article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public articles!: Article[];

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
     this.getArticlesForUser();
  }

  private getArticlesForUser(): void {
    this.articleService.getArticlesForUser().subscribe((response) => {
      this.articles = response.data;
    });
  }

  public articleListChanged(): void {
      this.getArticlesForUser();
  }
}
