import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from './components/common/header/header.component';
import {ArticleComponent} from './pages/articles/article.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';

const routes: Routes = [
  {path:'', component:HeaderComponent, children:[
      {path: '', component: ArticleComponent },
      {path: 'articles', component: ArticleComponent }
    ]},

      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
