import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaDoBrasilComponent } from './mapa-do-brasil.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MapaDoBrasilComponent
  ],
  exports: [
    MapaDoBrasilComponent
  ]
})
export class MapaDoBrasilModule { }
