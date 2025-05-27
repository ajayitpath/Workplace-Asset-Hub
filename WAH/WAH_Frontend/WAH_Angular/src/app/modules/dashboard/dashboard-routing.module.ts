import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AssetManagementComponent } from '../asset-management/asset-management.component';
import { InventorymanagementComponent } from '../inventorymanagement/inventorymanagement.component';
import { RequestapprovalComponent } from '../requestapproval/requestapproval.component';
import { ReportanalyticsComponent } from '../reportanalytics/reportanalytics.component';
import { SupportfaqComponent } from '../supportfaq/supportfaq.component';

const routes: Routes = [
  {
    path: '',
    component:DashboardComponent
  },
  {
    path: 'asset-management',
    component:AssetManagementComponent
  },
  // {
  //   path: 'asset-management/add',

  // },
  // {
  //   path: 'asset-management/edit/:id',
  // },
  // {
  //   path: 'asset-management/delete/:id',
  // },
  {
    path: 'inventory-management',
    component:InventorymanagementComponent
  },
  // {
  //   path: 'inventory-management/add',
  // },
  // {
  //   path: 'inventory-management/edit/:id',
  // },
  // {
  //   path: 'inventory-management/delete/:id',
  // },
  {
    path: 'requests-approvals',
    component: RequestapprovalComponent
  },
  // {
  //   path: 'requests-approvals/add',
  // },
  // {
  //   path: 'requests-approvals/edit/:id',
  // },
  // {
  //   path: 'requests-approvals/delete/:id',
  // },
  {
    path:'reports-analytics',
    component: ReportanalyticsComponent
  },
{
  path: 'support-faq',
  component: SupportfaqComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
