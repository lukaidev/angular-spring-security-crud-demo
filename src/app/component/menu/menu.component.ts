import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MenuService } from 'src/app/services/menu.service';
import { MenuPage, Menu } from 'src/app/model/menu';
import { Observable, BehaviorSubject } from 'rxjs';
import { DialogMenuAddComponent } from '../dialog-menu-add/dialog-menu-add.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  index = 0;
  length = 0;
  pageSize = 0;
  pageSizeOptions: number[] = [1, 5, 10];
  isMenuPageReady: boolean = false;
  menuPage: BehaviorSubject<MenuPage>;
  menuPageObs: Observable<MenuPage>;
  editMode: boolean = false;

  constructor(
    private dialog: MatDialog,
    private menuService: MenuService
  ) {

  }

  ngOnInit(): void {
    this.menuPageObs = this.menuService.getMenus(1, 5);
    this.menuPageObs.subscribe(res => {
      this.menuPage = new BehaviorSubject(res);
    });
    this.setPaginator();
  }

  pageEvent: PageEvent;

  getPage(pageEvent) {
    const index = pageEvent ? pageEvent.pageIndex + 1 : 1;
    const size = pageEvent ?  pageEvent.pageSize : 5
    this.menuPageObs = this.menuService.getMenus(index, size);
    this.menuPageObs.subscribe(res => {
      this.menuPage.next(res);
    });
    this.setPaginator();
    return pageEvent;
  }

  setPaginator() {
    this.menuPageObs.subscribe(res => {
      this.length = res.elements;
      this.pageSize = Math.ceil(res.elements / res.pages);
    });

  }

  openAddDialog() {
    const dialogRef = this.dialog.open(DialogMenuAddComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(res => {
      const menu = <Menu>res;
      if(menu){
        this.menuService.save(menu).subscribe(() => {
          this.getPage(this.pageEvent);
        })
      }
    });
  }


  menuRemove(menu) {
    console.log(menu);
    this.getPage(this.pageEvent);
  }

}
