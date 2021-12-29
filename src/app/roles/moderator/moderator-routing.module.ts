import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModeratorComponent } from './moderator.component';


const routes: Routes = [
     {
          path: '',
          component: ModeratorComponent,
          children: [
               
          ]
     }
];

@NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
})
export class ModeratorRoutingModule { }