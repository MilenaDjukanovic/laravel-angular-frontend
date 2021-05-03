import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Article} from '../../article.model';
import {MatDialog} from '@angular/material/dialog';
import {ArticleDialogComponent} from '../article-dialog/article-dialog.component';
import {AuthService} from '../../../../services/auth.service';
import {User} from '../../../../components/common/user/user.model';
import {ArticleService} from '../../article.service';

export interface DialogData {
  article: Article;
  user: User;
  type: boolean;
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

  @Output()
  public articleDataChanged = new EventEmitter();

  public user = this.authService.getCurrentUserValue();

  public constructor(public dialog: MatDialog, private authService: AuthService, private articleService: ArticleService) {

  }

  openDialog(actionType: boolean): void {
    const dialogRef = this.dialog.open(ArticleDialogComponent, {
      width: '400px',
      data: {article: this.article, user: this.user, type: actionType}
    });

    dialogRef.componentInstance.articleEdited.subscribe(() => {
      this.articleDataChanged.emit();
    });
  }

  ngOnInit(): void {
  }

  public onDelete(): void {
    this.articleService.deleteArticle(this.article.id).subscribe(() => {
      this.articleDataChanged.emit();
    });
  }

}
