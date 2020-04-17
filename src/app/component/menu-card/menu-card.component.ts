import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Menu } from 'src/app/model/menu';
import { MenuService } from 'src/app/services/menu.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit {

  editMode: boolean = false;

  form: FormGroup = new FormGroup({
    menuname: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(1)
    ])
  });

  @Input()
  menu: Menu;

  @Output() 
  menuRemoved = new EventEmitter<Menu>();

  constructor(private menuService: MenuService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDeleteDialog(id) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {
        isConfirmation: true,
        title: "Menu",
        message: "Are you sure you want do delete this?"
      }
    });

    dialogRef.afterClosed().subscribe(isOk => {
      if (isOk) {
        this.menuService.delete(id).subscribe(m => {
          this.menuRemoved.emit(this.menu);
          console.log(m);
        }, () => {
          this.showMessage();
        });

      }
    });
  }

  onSaveMenu(menu: Menu) {
    if (this.form.valid) {
      menu.name = this.form.value.menuname;
      this.menuService.update(menu).subscribe(m => {
        this.menu.name = m.name
        console.log(m);
      }, () => {
        this.showMessage();
      });
      this.editMode = false;
    }
  }

  onEditMenuExit() {
    this.editMode = false;
  }

  onEditMenu() {
    this.form.setValue({
      menuname: this.menu.name
    });
    this.editMode = true;
  }

  onRemoveMenu(menu) {
    const id = menu.id;
    this.openDeleteDialog(id);

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
