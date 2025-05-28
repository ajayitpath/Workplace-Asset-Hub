import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { ReusabletableComponent } from '../Component/reusabletable/reusabletable.component';
import { SidebarComponent } from '../Component/sidebar/sidebar.component';
import { MainLayoutComponent } from '../Layout/main-layout/main-layout.component';
import { RouterLink, RouterOutlet } from '@angular/router';



@NgModule({
  declarations: [ReusabletableComponent, SidebarComponent, MainLayoutComponent],
  imports: [
  CommonModule,
  TableModule,
  CardModule,
  ButtonModule,
  InputTextModule, 
  RouterOutlet,
  DropdownModule,
  FormsModule, 
  RouterLink,
  TooltipModule
  ],
  exports: [
    ReusabletableComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
