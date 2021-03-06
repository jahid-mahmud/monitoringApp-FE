import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './login/auth.guard';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
