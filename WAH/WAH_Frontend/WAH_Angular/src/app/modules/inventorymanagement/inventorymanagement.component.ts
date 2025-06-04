import { Component } from '@angular/core';
import { InventoryItemModel } from '../../shared/Model/inventory.model';



@Component({
  selector: 'app-inventorymanagement',
  standalone: false,
  templateUrl: './inventorymanagement.component.html',
  styleUrl: './inventorymanagement.component.css'
})
export class InventorymanagementComponent {
 public inventoryItems: InventoryItemModel[] = [];
  filteredData: InventoryItemModel[] = [];
  searchText = '';

  columns = [
    { field: 'itemName', header: 'Item Name' },
    { field: 'category', header: 'Category' },
    { field: 'currentStock', header: 'Current Stock' },
    { field:'status', header: 'Status' },
  ];

  ngOnInit(): void {
    // Sample data - replace with API call
  }

  onSearchChange(): void {
    const keyword = this.searchText.toLowerCase();
    this.filteredData = this.inventoryItems.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(keyword)
      )
    );
  }
  onAddInventory()
  {
    
  }

  onEdit(data:string) {
    
  }

  onDelete(id: string) {
 
  }

  onView(id: string) {
    
  }
}
