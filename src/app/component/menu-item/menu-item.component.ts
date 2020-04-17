import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuItem, Menu } from 'src/app/model/menu';
import { DialogMenuItemAddComponent } from '../dialog-menu-item-add/dialog-menu-item-add.component';
import { MenuItemService } from 'src/app/services/menu-item.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input()
  menu: Menu;
  menuItems: MenuItem[];

  constructor(private itemService: MenuItemService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.menuItems = this.menu.menuItems;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogMenuItemAddComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const item = <MenuItem>result;
        this.itemService.save(item, this.menu.id).subscribe(res => {
          this.menuItems.push(res);
          this.menu.menuItems = this.menuItems;
          console.log(res);
        });
      }
    });
  }


  menuItemRemove(item: MenuItem) {
    this.menuItems.map((i,index)=> {
      if(item.id == i.id){
        this.menuItems.splice(index, 1);
      }
    });
    console.log(item);
  }


}
