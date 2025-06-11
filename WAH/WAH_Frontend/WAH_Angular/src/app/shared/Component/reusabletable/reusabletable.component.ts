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
  @Input() idFieldName: 'AssetId' | 'CategoryId' = 'AssetId';
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() view = new EventEmitter<any>();

  get globalFilterFields(): string[] {
    return this.columns.map(c => c.field);
  }
  private getId(rowData: any): string {
    const field = this.idFieldName || (rowData['AssetId'] ? 'AssetId' : (rowData['categoryId'] ? 'categoryId' : ''));
    const id = rowData?.[field];
    if (!id || typeof id !== 'string') {
      console.warn(`ReusableTable: '${field}' not found or not a string:`, rowData);
      return '';
    }
    return id;
  }

  emitEditId(rowData: any): void {
    const id = this.getId(rowData);
    if (id) this.edit.emit(id);
  }

  emitDeleteId(rowData: any): void {
    const id = this.getId(rowData);
    if (id) this.delete.emit(id);
  }

  emitViewId(rowData: any): void {
    const id = this.getId(rowData);
    if (id) this.view.emit(id);
  }
}
