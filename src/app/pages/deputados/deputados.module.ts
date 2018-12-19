import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { DeputadosRoutingModule } from './deputados-routing.module';
import { DeputadosComponent } from './deputados.component';
import { StatisticsModule } from '../statistics/statistics.module';

@NgModule({
  declarations: [
    DeputadosComponent
  ],
  imports: [
    CommonModule,
    DeputadosRoutingModule,

    StatisticsModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeputadosModule { }
