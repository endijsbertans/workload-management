import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/auth/auth-wrapper/login/login.component";
import {ActivateAccountComponent} from "./pages/auth/auth-wrapper/activate-account/activate-account.component";
import {WorkloadListComponent} from "./pages/main/workload-list/workload-list.component";
import {DashboardComponent} from "./pages/main/dashboard/dashboard.component";

import {NewTeachingStaffComponent} from "./pages/main/new-objects/new-teaching-staff/new-teaching-staff.component";
import {NewCourseComponent} from "./pages/main/new-objects/new-course/new-course.component";
import {NewClassComponent} from "./pages/main/new-objects/new-class/new-class.component";
import {
  WorkloadContainerComponent
} from "./pages/main/workload-list/new-workload/workload-container/workload-container.component";
import {authAdmin, authGuard, publicRoute} from "./services/guard/auth.guard";
import {ObjectContainerComponent} from "./pages/main/object-container/object-container.component";
import {NewFacultyComponent} from "./pages/main/new-objects/new-faculty/new-faculty.component";
import {NewAcademicRankComponent} from "./pages/main/new-objects/new-academic-rank/new-academic-rank.component";
import {
  NewAcademicRankDetailsComponent
} from "./pages/main/new-objects/new-academic-rank-details/new-academic-rank-details.component";
import {NewStatusTypesComponent} from "./pages/main/new-objects/new-status-types/new-status-types.component";
import {NewSemesterComponent} from "./pages/main/new-objects/new-semester/new-semester.component";
import {
  WorkloadListSettingsComponent
} from "./pages/main/workload-list/workload-list-settings/workload-list-settings.component";
import {ForgotPasswordComponent} from "./pages/auth/auth-wrapper/login/forgot-password/forgot-password.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth-wrapper/auth-wrapper.component').then(m => m.AuthWrapperComponent),
    children: [
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
        path: 'activate-account',
        component: ActivateAccountComponent,
        canActivate: [publicRoute]
      },
      {
        path: 'activate-account/:token',
        component: ActivateAccountComponent,
        canActivate: [publicRoute]
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
    ]
  },

  {
    path: 'main',
    loadComponent: () => import('./pages/main/main.component').then(m => m.MainComponent),
    canActivate: [authGuard],
    children: [{
      path: '',
      component: DashboardComponent
    }, {
      path: 'user-workload',
      component: WorkloadListComponent,
      children: [
        {
          path: 'column-settings',
          component: WorkloadListSettingsComponent
        }
      ]

    },
      {
        path: 'admin-workload',
        component: WorkloadListComponent,
        canActivate: [authAdmin],
        children: [
          {
            path: 'column-settings',
            component: WorkloadListSettingsComponent
          },
          {
            path: 'edit-workload/:id',
            component: WorkloadContainerComponent,

            children: [{
              path: 'new-teaching-staff',
              component: NewTeachingStaffComponent
            },
              {
                path: 'new-course',
                component: NewCourseComponent
              },
              {
                path: 'new-class',
                component: NewClassComponent
              }]
          },
          {
            path: 'new-workload',
            component: WorkloadContainerComponent,
            children: [{
              path: 'new-teaching-staff',
              component: NewTeachingStaffComponent
            },
              {
                path: 'new-course',
                component: NewCourseComponent
              },
              {
                path: 'new-class',
                component: NewClassComponent
              },
            ],
          }],
      }, {
        path: 'objects',
        component: ObjectContainerComponent,
        canActivate: [authAdmin],
        children: [
          {
            path: 'new-teaching-staff',
            component: NewTeachingStaffComponent
          },
          {
            path: 'new-course',
            component: NewCourseComponent
          },
          {
            path: 'new-class',
            component: NewClassComponent
          },
          {
            path: 'new-faculty',
            component: NewFacultyComponent
          },
          {
            path: 'new-academic-rank',
            component: NewAcademicRankComponent
          },
          {
            path: 'new-academic-rank-details',
            component: NewAcademicRankDetailsComponent
          },
          {
            path: 'new-status-type',
            component: NewStatusTypesComponent
          },
          {
            path: 'new-semester',
            component: NewSemesterComponent
          },
          {path: 'edit-teaching-staff/:id', component: NewTeachingStaffComponent},
          {path: 'edit-status-type/:id', component: NewStatusTypesComponent},
          {path: 'edit-semester/:id', component: NewSemesterComponent},
          {path: 'edit-course/:id', component: NewCourseComponent},
          {path: 'edit-my-class/:id', component: NewClassComponent},
          {path: 'edit-faculties/:id', component: NewFacultyComponent},
          {path: 'edit-academic-rank/:id', component: NewAcademicRankComponent},
          {path: 'edit-academic-rank-details/:id', component: NewAcademicRankDetailsComponent},

        ],
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'main'
  }
];
