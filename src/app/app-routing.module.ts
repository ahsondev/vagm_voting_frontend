import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { OtpLayoutComponent } from './pages/otp-layout/otp-layout.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthComponent } from './auth/auth.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [
     {
          path: '',
          loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
     },
     {
          path: 'auth',
          component: AuthComponent,
          // canActivate: [AuthGuard]
     },
     {
          path: 'login',
          component: LoginComponent
     },
     {
          path : 'validate/otp',
          component: OtpLayoutComponent
     },
     {
          path : 'tutorial',
          component : TutorialComponent
     },
     {
          path : 'logout',
          component: LogoutComponent
     }
];

@NgModule({
     imports: [RouterModule.forRoot(routes)],
     exports: [RouterModule]
})
export class AppRoutingModule { }
