import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private endpoint: string = '/demo';
    constructor(private http: HttpClient) { }

    getAsset(payload?) {
        return this.http.get(payload);
    }

    get(url) {
        return this.http.get(this.endpoint + url);
    }

    post(url, payload) {
        return this.http.post(this.endpoint + url, payload);
    }

    put(url, payload) {
        return this.http.put(this.endpoint + url, payload);
    }

    delete(url) {
        return this.http.delete(this.endpoint + url);
    }
}