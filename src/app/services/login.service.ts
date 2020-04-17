import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LoginRequest, LoginResponse } from '../model/authentication';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpService) { }

    login(credentials: LoginRequest) : Observable<LoginResponse> {
        return this.http.post('/auth', credentials).pipe(map(res => {
            let loginRes: LoginResponse = {
                username: res['username'],
                token: res['token'],
                roles: res['roles']
            };
            return loginRes;
        } ));
    }

}
