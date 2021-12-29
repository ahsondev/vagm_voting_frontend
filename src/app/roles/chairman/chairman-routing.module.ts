import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChairmanComponent } from './chairman.component';



const routes: Routes = [
     {
          path: '',
          component: ChairmanComponent,
          children: [
               
          ]
     }
];

@NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
})
export class ChairmanRoutingModule { }