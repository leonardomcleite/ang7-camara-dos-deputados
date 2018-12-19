import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { ModalDialogComponent } from './modal-dialog.component';

@NgModule({
  imports: [
    CommonModule,

    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    ModalDialogComponent
  ],
  declarations: [
    ModalDialogComponent
  ],
})
export class ModalDialogModule { }
