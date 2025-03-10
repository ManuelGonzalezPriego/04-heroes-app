import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../interface/hero.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [
  ]
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero,
  ){}

  // Y creamos la asignación. Además enviaremos true o false según el caso:
  onNoClick():void{
    this.dialogRef.close(false);
  }

  onConfirm():void{
    this.dialogRef.close(true);
  }

}
