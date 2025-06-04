import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AssetManagementComponent } from '../asset-management/asset-management.component';
import { InventorymanagementComponent } from '../inventorymanagement/inventorymanagement.component';
import { RequestapprovalComponent } from '../requestapproval/requestapproval.component';
import { ReportanalyticsComponent } from '../reportanalytics/reportanalytics.component';
import { SupportfaqComponent } from '../supportfaq/supportfaq.component';
import { MainLayoutComponent } from '../../shared/Layout/main-layout/main-layout.component';
import { AuthGuard } from '../../shared/Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
<<<<<<< HEAD
      { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard] },
=======
      { path: 'adnin-dashboard', component: DashboardComponent },
>>>>>>> db1470f0b72acea2191d0910db515cf770737bf9
      { path: 'asset-management', component: AssetManagementComponent },
      { path: 'inventory-management', component: InventorymanagementComponent },
      { path: 'requests-approvals', component: RequestapprovalComponent },
      { path: 'reports-analytics', component: ReportanalyticsComponent },
      { path: 'support-faq', component: SupportfaqComponent },
      { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
