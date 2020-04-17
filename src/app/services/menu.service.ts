import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, throwError } from 'rxjs';
import { Menu, MenuPage } from '../model/menu';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private url = `/api/menu`;

    constructor(private http: HttpService, private dialog: MatDialog) { }

    getMenus(page: number, limit:number): Observable<MenuPage> {
        return this.http.get(`${this.url}?page=${page}&limit=${limit}`).pipe(map(res => {

            const response:any = res;
            const data = response.data;
            let menuPage: MenuPage;

            if(data){
                menuPage = {
                    elements: data.elements,
                    pages: data.pages,
                    results: data.results
                };
            }
           
            return menuPage;
        }));
    }

    save(menu: Menu): Observable<Menu> {
        return this.http.post(`${this.url}`, menu).pipe(map(res => {
            const response:any =res;
            const data = response.data;
            let menuResponse: Menu;
            if(data) {
                menuResponse = {
                    id: data.id,
                    name: data.name,
                    menuItems: data.menuItems,
                    inUsed: data.inUsed
                }
            }
            return menuResponse;
        }));
    }

    update(menu: Menu): Observable<Menu> {
        return this.http.put(`${this.url}`, menu).pipe(map(res => {
            const response:any =res;
            const data = response.data;
            let menuResponse: Menu;
            if(data) {
                menuResponse = {
                    id: data.id,
                    name: data.name,
                    menuItems: data.menuItems,
                    inUsed: data.inUsed
                }
            }
            return menuResponse;
        }));
    }

    delete(id: number): Observable<string> {
        return this.http.delete(`${this.url}/${id}`).pipe(map(res => {
            const response:any = res;
            const message = response.message;
            return message;
        }));
    }

}