import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssetManagementComponent } from '../asset-management/asset-management.component';
import { SharedModule } from '../../shared/Module/shared.module';
import { InventorymanagementComponent } from '../inventorymanagement/inventorymanagement.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AddEditComponent } from '../asset-management/add-edit/add-edit.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TextareaModule } from 'primeng/textarea';
import { RequestapprovalComponent } from '../requestapproval/requestapproval.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
@NgModule({
  declarations: [DashboardComponent, AssetManagementComponent, InventorymanagementComponent, AddEditComponent, RequestapprovalComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ToggleButtonModule,
    ReactiveFormsModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TextareaModule,
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    
  ],
  providers: [ConfirmationService, MessageService],
})
export class DashboardModule { }
