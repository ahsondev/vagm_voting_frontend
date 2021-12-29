import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
     {
          path: '',
          component: LayoutComponent,
          children: [
               {
                    path: 'voting',
                    loadChildren: () => import('./../voting/voting.module').then(m => m.VotingModule),
               },
               {
                    path: '',
                    redirectTo: '/voting',
                    pathMatch: 'full'
               }
          ]
     }
];

@NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
})
export class LayoutRoutingModule { }
