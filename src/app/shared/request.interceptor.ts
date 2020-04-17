import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(
        private cookie: CookieService, private storage: StorageService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let _headers: HttpHeaders;

        const token = this.cookie.get('t');
        if (token) {
            _headers = new HttpHeaders({
                Authorization: `Bearer ${token}`
            });
        } else {
            this.storage.getCredentials().subscribe(res => {
                this.cookie.set('t', res.token);
                window.location.reload();
            })
        }

        const _req = req.clone({
            headers: _headers
        });
        return next.handle(_req);
    }

}