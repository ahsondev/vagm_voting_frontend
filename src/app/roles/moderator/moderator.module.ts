import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeratorRoutingModule } from './moderator-routing.module';
import { ModeratorSettingComponent } from '../../pages/moderator-setting/moderator-setting.component';
import { ModeratorComponent } from './moderator.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from '../shared/shared.module';
import { ResolutionComponent } from '../../pages/resolution/resolution.component'
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
     imports: [
          CommonModule,
          ModeratorRoutingModule,
          MatExpansionModule,
          SharedModule,
          NgxSpinnerModule,
          FormsModule,
          ReactiveFormsModule,
     ],
     declarations: [
          ModeratorComponent,
          ModeratorSettingComponent,
          ResolutionComponent,
     ]
})
export class ModeratorModule { }
