import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { LoginResponse } from 'src/app/model/authentication';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  credentials: BehaviorSubject<LoginResponse>;

  constructor(
    private storage: StorageService,
    private cookie: CookieService) {

  }

  ngOnInit(): void {
    this.storage.getCredentials().subscribe(res => {
      this.credentials = new BehaviorSubject(res);
    })
  }

  checkAdminRole() {
    let hasAdminRole: boolean;
    const cread = this.credentials.getValue();
    if (cread) {
      hasAdminRole = cread.roles.includes('ADMIN')
    } else {
      this.storage.clear();
      this.cookie.deleteAll();
    }
    return hasAdminRole;
  }

}
