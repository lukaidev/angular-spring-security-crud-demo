import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem, Menu } from 'src/app/model/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MenuItemService } from 'src/app/services/menu-item.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu-item-card',
  templateUrl: './menu-item-card.component.html',
  styleUrls: ['./menu-item-card.component.scss']
})
export class MenuItemCardComponent implements OnInit {

  @Input()
  item: MenuItem;

  @Input()
  menuId: number;

  @Output() 
  menuItemRemoved = new EventEmitter<MenuItem>();

  editMode: boolean = false;

  form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(3)
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(\d+\.?\d{0,9}|\.\d{1,9})$/ ),
      Validators.maxLength(30),
      Validators.minLength(3)
    ])
  });

  constructor(private dialog: MatDialog, private itemService: MenuItemService) { }

  ngOnInit(): void {
  }

  openDeleteDialog(id) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {
        isConfirmation: true,
        title: "Menu Item",
        message: "Are you sure you want do delete this?"
      }
    });

    dialogRef.afterClosed().subscribe(isOk => {
      if (isOk) {
        this.itemService.delete(id, this.menuId).subscribe(m => {
          this.menuItemRemoved.emit(this.item);
          console.log(m);
        }, () => {
          this.showMessage();
        });

      }
    });
  }

  onSaveMenu(item){
    if(this.form.valid) {
      item.name = this.form.value.name;
      item.price = this.form.value.price;
      this.itemService.update(item, this.menuId).subscribe(res => {
        this.item.name = res.name;
        this.item.price = res.price;
      }, () => {
        this.showMessage();
      });
    }
    console.log(item);
    this.editMode = false;
  }

  onEditMenuExit(){
    this.editMode = false;
  }
  
  onEditMenu() {
    this.form.setValue({
      name: this.item.name,
      price: this.item.price
    });
    this.editMode = true;
  }

  onRemoveMenu(item: MenuItem){
    this.openDeleteDialog(item.id)
  }

  showMessage(_title?, _message?) {
    const title = _title ? _title : 'Menu';
    const message = _message ? _message : "Something when wrong";
    this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {
        isConfirmation: false,
        title,
        message
      }
    });
  }

}
