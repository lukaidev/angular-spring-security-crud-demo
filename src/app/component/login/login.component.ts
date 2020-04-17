import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/model/authentication';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(3)
    ]),
    password: new FormControl('',
    [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(3)
    ]),
  });

  error: string | null;

  constructor(
    private loginService: LoginService,
    private storage: StorageService,
    private cookie: CookieService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    
  }

  submit() {
    this.error = null;
    if (this.form.valid) {
      const loginRequest: LoginRequest = {
        username: this.form.value.username,
        password: this.form.value.password,
        rememberMe: true
      };
      this.loginService.login(loginRequest).subscribe(response => {
        this.storage.setCredential(response);
        this.cookie.set('t', response.token);
        this.auth.authenticate(true);
      },(error) => {
        this.error = 'Invalid Username/Password';
      });
    }
  }
  

}
