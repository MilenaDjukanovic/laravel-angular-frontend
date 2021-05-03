import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onRegister(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const name = this.registerForm.controls.name.value;
    const email = this.registerForm.controls.email.value;
    const password = this.registerForm.controls.password.value;

    this.authService.register(name, email, password).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

}
