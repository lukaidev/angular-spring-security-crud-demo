import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'demo';

  authenticated: Promise<boolean>;

  constructor(
    private auth: AuthService,
    private storage: StorageService,
    private cookie: CookieService
  ) {
  }

  ngOnInit(): void {

    this.auth.authenticated$.subscribe(auth => {
      this.authenticated = Promise.resolve(auth);
    })
    this.storage.getCredentials().subscribe(res => {
      if (res)
        this.authenticated = Promise.resolve(true);
    })
  }

  logout(){
    this.storage.clear();
    this.cookie.deleteAll();
    window.location.reload();
  }

}
