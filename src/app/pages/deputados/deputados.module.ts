import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
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
    MatIconModule
  ]
})
export class DeputadosModule { }
