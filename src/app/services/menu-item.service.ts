import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, throwError } from 'rxjs';
import { MenuItem } from '../model/menu';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MenuItemService {

    private url = `/api/menu`;

    constructor(private http: HttpService) { }

    save(item: MenuItem, menuId: number): Observable<MenuItem> {
        return this.http.post(`${this.url}/${menuId}/item`, item).pipe(map(res => {
            const response:any =res;
            const data = response.data;
            let menuItemResponse: MenuItem;
            if(data) {
                menuItemResponse = {
                    id: data.id,
                    name: data.name,
                    price: data.price
                }
            }
            return menuItemResponse;
        }));
    }

    update(item: MenuItem, menuId: number): Observable<MenuItem> {
        return this.http.put(`${this.url}/${menuId}/item`, item).pipe(map(res => {
            const response:any =res;
            const data = response.data;
            let menuItemResponse: MenuItem;
            if(data) {
                menuItemResponse = {
                    id: data.id,
                    name: data.name,
                    price: data.price
                }
            }
            return menuItemResponse;
        }));
    }

    delete(id: number, menuId): Observable<string> {
        return this.http.delete(`${this.url}/${menuId}/item/${id}`).pipe(map(res => {
            const response:any = res;
            const message = response.message;
            return message;
        }));
    }

}