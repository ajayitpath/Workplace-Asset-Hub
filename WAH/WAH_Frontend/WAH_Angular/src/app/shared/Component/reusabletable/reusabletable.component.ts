import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-reusabletable',
  standalone: false,
  templateUrl: './reusabletable.component.html',
  styleUrl: './reusabletable.component.css'
})
export class ReusabletableComponent {
  @Input() data: any[] = [];
  @Input() columns: { field: string, header: string, filterable?: boolean }[] = [];
  @Input() showActions: boolean = false;

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() view = new EventEmitter<any>();
  
  get globalFilterFields(): string[] {
    return this.columns.map(c => c.field);
  }
  
}
