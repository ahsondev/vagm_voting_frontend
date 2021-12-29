import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpRoutingModule } from './sp-routing.module';
import { SpComponent } from './sp.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from "ngx-spinner";



@NgModule({
     declarations: [
          SpComponent
     ],
     imports: [
          CommonModule,
          SpRoutingModule,
          MatExpansionModule,
          NgxSpinnerModule,
          SharedModule
     ]
})
export class SpModule { }
