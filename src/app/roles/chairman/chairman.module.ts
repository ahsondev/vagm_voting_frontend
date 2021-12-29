import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChairmanRoutingModule } from './chairman-routing.module';
import { ChairmanComponent } from './chairman.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from '../shared/shared.module';


@NgModule({
     declarations: [
          ChairmanComponent
     ],
     imports: [
          CommonModule,
          ChairmanRoutingModule,
          MatExpansionModule,
          SharedModule
     ]
})
export class ChairmanModule { }
