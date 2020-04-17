import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {

    private authenticatedSource = new Subject<boolean>();

    authenticated$ = this.authenticatedSource.asObservable();

    authenticate(isAuth: boolean){
        this.authenticatedSource.next(isAuth);
    }

}