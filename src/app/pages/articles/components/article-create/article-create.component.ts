import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ArticleService} from '../../article.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss']
})
export class ArticleCreateComponent implements OnInit {

  @Output()
  public newArticle = new EventEmitter();

  public createArticleForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private articleService: ArticleService) { }

  ngOnInit(): void {
    this.createArticleForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  public createArticle(): void {

    if(this.createArticleForm.invalid) {
      return;
    }

    const title = this.createArticleForm.controls.title.value;
    const body = this.createArticleForm.controls.body.value;

    this.articleService.createArticle(title, body).subscribe(() => {
        this.newArticle.emit();
      }
    );
    this.clearFields();
  }

  private clearFields(): void{
    this.createArticleForm.controls.title.setValue('');
    this.createArticleForm.controls.title.setErrors(null);
    this.createArticleForm.controls.body.setValue('');
    this.createArticleForm.controls.body.setErrors(null);
  }
}
