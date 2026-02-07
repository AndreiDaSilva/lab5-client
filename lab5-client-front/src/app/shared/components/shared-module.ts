import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleSelect } from './single-select/single-select';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SingleSelect
  ],
  exports: [
    SingleSelect
  ]
})
export class SharedModule { }
