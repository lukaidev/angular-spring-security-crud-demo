import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { LoginResponse } from '../model/authentication';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class StorageService {

    public CREDENTIAL: string = "CREDENTIAL";

    constructor(protected localStorage: LocalStorage) { }

    public setItem(item, payload) {
        this.localStorage.setItem(item, payload).subscribe(() => { });
    }

    public getItem(item) {
        return this.localStorage.getItem<any>(item);
    }

    public clear() {
        this.localStorage.clear().subscribe(() => { });
    }

    public getCredentials(): Observable<LoginResponse> {
        return this.localStorage.getItem<LoginResponse>(this.CREDENTIAL).pipe(map(res => {
            let loginRes: LoginResponse;
            if(res){
                loginRes = {
                    username: res['username'],
                    token: res['token'],
                    roles: res['roles']
                };
            }
            return loginRes;
        }));
    }

    public setCredential(cred: LoginResponse) {
        this.localStorage.setItem(this.CREDENTIAL, cred).subscribe(() => { });
    }

}
