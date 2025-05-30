import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { AssetManagementComponent } from '../asset-management/asset-management.component';
import { SharedModule } from '../../shared/Module/shared.module';
import { InventorymanagementComponent } from '../inventorymanagement/inventorymanagement.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [DashboardComponent, AssetManagementComponent, InventorymanagementComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    SharedModule,
    InputTextModule,
    ButtonModule
  ]
})
export class DashboardModule { }
