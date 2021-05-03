import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  private returnURL!: string;
  public error!: string;

  private loading = false;
  private submitted = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private router: Router, private authService: AuthService) {
    // redirect to home if already logged in
    if (this.authService.getCurrentUserValue()) {
       this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnURL = this.route.snapshot.queryParams.returnUrl || '/';
  }

  public onSubmit(): void {
    this.submitted = true;

    // stop here if the form is invalid
    if (this.loginForm.invalid) {
      // @ts-ignore
      alert('Login data not valid!');
      return;
    }

    this.loading = true;
    const username = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;
    this.authService.login(username, password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnURL]);
        },
        error => {
          this.error = error;
          alert('Login data not valid!');
          this.loading = false;
        }
      );
  }

  public redirectToRegister(): void {
    this.router.navigate(['/register']);
  }
}
