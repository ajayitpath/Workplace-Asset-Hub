import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AssetManagementComponent } from '../asset-management/asset-management.component';
import { InventorymanagementComponent } from '../inventorymanagement/inventorymanagement.component';
import { RequestapprovalComponent } from '../requestapproval/requestapproval.component';
import { ReportanalyticsComponent } from '../reportanalytics/reportanalytics.component';
import { SupportfaqComponent } from '../supportfaq/supportfaq.component';
import { MainLayoutComponent } from '../../shared/Layout/main-layout/main-layout.component';
import { AssestcategoriesComponent } from '../assestcategories/assestcategories.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'admin-dashboard', component: DashboardComponent },
      { path: 'asset-management', component: AssetManagementComponent },
      { path: 'inventory-management', component: InventorymanagementComponent },
      { path: 'requests-approvals', component: RequestapprovalComponent },
      { path: 'asset-categories', component: AssestcategoriesComponent },
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
