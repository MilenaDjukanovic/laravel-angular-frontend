import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../article-view-card/article-view-card.component';
import {ArticleService} from '../../article.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-article-dialog',
  templateUrl: './article-dialog.component.html',
  styleUrls: ['./article-dialog.component.scss']
})
export class ArticleDialogComponent implements OnInit {

  @Output()
  public articleEdited = new EventEmitter();

  public viewArticleForm!: FormGroup;

  ngOnInit(): void {
    this.viewArticleForm = this.formBuilder.group({
      title: [this.data.article.title, Validators.required],
      body: [this.data.article.body, Validators.required]
    });

    if (this.data.type) {
      this.viewArticleForm.disable();
    }
  }

  constructor(
    public dialogRef: MatDialogRef<ArticleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private articleService: ArticleService, private formBuilder: FormBuilder) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public editArticle(): void {
    const id = this.data.article.id;
    const title = this.viewArticleForm.controls.title.value;
    const body = this.viewArticleForm.controls.body.value;

    this.articleService.editArticle(id, title, body).subscribe(() => {
      this.articleEdited.emit();
    });
  }
}
