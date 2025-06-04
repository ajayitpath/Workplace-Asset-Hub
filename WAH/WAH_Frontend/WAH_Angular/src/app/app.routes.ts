import { Routes } from '@angular/router';
import { AuthGuard } from './shared/Guards/auth.guard';


export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('../app/modules/auth/auth.module').then((m) => m.AuthModule)
    },

    {

        path: 'dashboard',
         canActivate: [AuthGuard],
        loadChildren: () => import('../app/modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
    },

    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    }
];
