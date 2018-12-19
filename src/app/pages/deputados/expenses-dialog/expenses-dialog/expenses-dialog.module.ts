import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatButtonToggleModule, MatCardModule, MatDialogModule, MatDividerModule, MatProgressSpinnerModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { ModalDialogModule } from 'src/app/components/modal-dialog/modal-dialog.module';
import { ExpensesDialogComponent } from './expenses-dialog.component';

@NgModule({
  declarations: [
    ExpensesDialogComponent
  ],
  imports: [
    CommonModule,
    ModalDialogModule,
    FormsModule,
    ReactiveFormsModule,

    ChartsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatDividerModule
  ],
  entryComponents: [
    ExpensesDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExpensesDialogModule { }
