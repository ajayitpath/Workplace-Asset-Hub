import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';


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
  @Input() actionsTemplate!: TemplateRef<any>;
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() view = new EventEmitter<any>();

  get globalFilterFields(): string[] {
    return this.columns.map(c => c.field);
  }

  emitEditId(rowData: any): void {
    // Corrected: Use rowData.AssetId directly
    const id = rowData?.AssetId; // <-- Change this line
    if (typeof id === 'string') {
      this.edit.emit(id);
    } else {
      console.warn('ReusableTable: Cannot emit edit ID. ID property not found or not a string:', rowData);
    }
  }

  emitDeleteId(rowData: any): void {
    // Corrected: Use rowData.AssetId directly
    const id = rowData?.AssetId; // <-- Change this line
    if (typeof id === 'string') {
      this.delete.emit(id);
    } else {
      console.warn('ReusableTable: Cannot emit delete ID. ID property not found or not a string:', rowData);
    }
  }

  emitViewId(rowData: any): void {
    // Corrected: Use rowData.AssetId directly
    const id = rowData?.AssetId; // <-- Change this line
    if (typeof id === 'string') {
      this.view.emit(id);
    } else {
      console.warn('ReusableTable: Cannot emit view ID. ID property not found or not a string:', rowData);
    }
  }
}
