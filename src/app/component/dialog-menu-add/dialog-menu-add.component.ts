import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Menu } from 'src/app/model/menu';

@Component({
  selector: 'app-dialog-menu-add',
  templateUrl: './dialog-menu-add.component.html',
  styleUrls: ['./dialog-menu-add.component.scss']
})
export class DialogMenuAddComponent implements OnInit {

  form: FormGroup = new FormGroup({
    menuname: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(3)
    ])
  });

  error: string | null;

  constructor(
    public dialogRef: MatDialogRef<DialogMenuAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if(this.form.valid) {
      const menu: Menu = {
        id: null,
        name: this.form.value.menuname,
        menuItems: [],
        inUsed: true
      }
      this.dialogRef.close(menu);
    } else{
      this.error = 'Invalid menu name';
      console.log(this.error);
    }
  }

  ngOnInit(): void {
  }

}
