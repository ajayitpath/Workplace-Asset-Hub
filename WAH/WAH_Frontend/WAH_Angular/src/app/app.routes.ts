import { Routes } from '@angular/router';

export const routes: Routes = [
        {
        path: 'auth',
        loadChildren: () => import('../app/modules/auth/auth.module').then((m) => m.AuthModule)
    },
    {
path:'admin-dashboard',
loadChildren: () => import('../app/modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
    },
  
    {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
    }
];
