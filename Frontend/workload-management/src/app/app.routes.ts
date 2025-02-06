import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/auth/auth-wrapper/login/login.component";
import {ActivateAccountComponent} from "./pages/auth/auth-wrapper/activate-account/activate-account.component";
import {WorkloadListComponent} from "./pages/main/workload-list/workload-list.component";
import {NewWorkloadComponent} from "./pages/main/workload-list/new-workload/new-workload.component";
import {NewTeachingStaffComponent} from "./pages/main/new-objects/new-teaching-staff/new-teaching-staff.component";


export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth-wrapper/auth-wrapper.component').then(m => m.AuthWrapperComponent),
    children: [{
      path: 'login',
      component: LoginComponent
    }]
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent
  },
  {
    path: 'main',
    loadComponent: () => import('./pages/main/main.component').then(m => m.MainComponent),
    children: [{
      path: 'workload',
      component: WorkloadListComponent,
      children: [{
        path: 'new-workload',
        component: NewWorkloadComponent,
        children: [{
            path: 'new-teaching-staff',
            component: NewTeachingStaffComponent

        }]
      }]
    }
    ]
  }

];
