import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from './components/common/header/header.component';
import {ArticleComponent} from './pages/articles/article.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {AuthGuard} from './guards/auth.guard';
import {BasicLayoutComponent} from './layout/basic-layout/basic-layout.component';

const routes: Routes = [
  { path: '', component: HeaderComponent, canActivate: [AuthGuard], children: [
      { path: '', component: ArticleComponent },
      { path: 'articles', component: ArticleComponent }
    ]
  },

  { path: '', component: BasicLayoutComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },

  { path: '**', redirectTo: 'articles' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
