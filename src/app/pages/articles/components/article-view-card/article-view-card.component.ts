import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../article.model';
import {MatDialog} from '@angular/material/dialog';
import {ArticleDialogComponent} from '../article-dialog/article-dialog.component';

export interface DialogData {
  article: Article;
  type: string;
}

@Component({
  selector: 'app-article-view-card',
  templateUrl: './article-view-card.component.html',
  styleUrls: ['./article-view-card.component.scss']
})
export class ArticleViewCardComponent implements OnInit {

  @Input()
  article!: Article;
  type!: string;


  public constructor(public dialog: MatDialog) {

  }

  openDialog(actionType: string): void {
    const dialogRef = this.dialog.open(ArticleDialogComponent, {
      width: '400px',
      data: {article: this.article, type: actionType}
    });
  }

  ngOnInit(): void {
  }

}
