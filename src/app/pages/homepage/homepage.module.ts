import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { MapaDoBrasilModule } from 'src/app/components/mapa-do-brasil/mapa-do-brasil.module';
import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,

    MapaDoBrasilModule,
    MatCardModule
  ]
})
export class HomepageModule { }
