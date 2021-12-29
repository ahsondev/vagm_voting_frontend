import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpComponent } from './sp.component';



const routes: Routes = [
     {
          path: '',
          children : [
               {
                    path : ':id',
                    component : SpComponent
               }
          ]
     }
];

@NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
})
export class SpRoutingModule { }