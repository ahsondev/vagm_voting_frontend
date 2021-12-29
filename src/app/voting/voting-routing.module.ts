import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VotingComponent } from './voting.component';
import { VotingResolverService } from '../shared/resolver/voting.resolver.service';
import { DummyComponent } from '../pages/dummy/dummy.component';



const routes: Routes = [
     {
          path: '',
          component: VotingComponent,
          resolve: { resolver : VotingResolverService },
          children: [
               {
                    path : 'moderator',
                    loadChildren: () => import('./../roles/moderator/moderator.module').then(m => m.ModeratorModule),
               },
               {
                    path : 'sp',
                    loadChildren: () => import('./../roles/sp/sp.module').then(m => m.SpModule),
               },
               {
                    path : 'chairman',
                    loadChildren: () => import('./../roles/chairman/chairman.module').then(m => m.ChairmanModule),
               },
               {
                    path : 'dummy',
                    component : DummyComponent
               }
          ]
     }
];

@NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
})
export class VotingRoutingModule { }