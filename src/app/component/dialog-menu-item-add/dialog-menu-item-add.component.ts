import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Menu, MenuItem } from 'src/app/model/menu';

@Component({
  selector: 'app-dialog-menu-item-add',
  templateUrl: './dialog-menu-item-add.component.html',
  styleUrls: ['./dialog-menu-item-add.component.scss']
})
export class DialogMenuItemAddComponent implements OnInit {

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

  error: string | null;

  constructor(
    public dialogRef: MatDialogRef<DialogMenuItemAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if(this.form.valid) {
      const menuItem: MenuItem = {
        id: null,
        name: this.form.value.name,
        price: this.form.value.price
      }
      this.dialogRef.close(menuItem);
    } else{
      this.error = 'Invalid item name / price';
      console.log(this.error);
    }
  }

  ngOnInit(): void {
  }

}
