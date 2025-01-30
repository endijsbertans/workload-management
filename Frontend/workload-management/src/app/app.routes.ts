import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {ActivateAccountComponent} from "./pages/auth/activate-account/activate-account.component";
import {WorkloadListComponent} from "./pages/workload-list/workload-list.component";


export const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'activate-account',
    component: ActivateAccountComponent
  },
  {
    path: 'main',
    loadComponent: () => import('./pages/main/main.component').then(m=>m.MainComponent),
    children: [{
      path: 'workload',
      component: WorkloadListComponent
    }]
  }

];
