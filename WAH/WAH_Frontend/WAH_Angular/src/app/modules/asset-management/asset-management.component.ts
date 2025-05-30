import { Component } from '@angular/core';
import { AssetModel } from '../../shared/Model/asset.model';



@Component({
  selector: 'app-asset-management',
  standalone: false,
  templateUrl: './asset-management.component.html',
  styleUrl: './asset-management.component.css'
})
export class AssetManagementComponent {
public assets : AssetModel[] = [];
filteredData: AssetModel[] = [];
searchText = '';

ngOnInit() {
  // Fetch asset data here
  this.filteredData= this.assets ; // initialize
}
  columns = [
  { field: 'assetName', header: 'Asset Name' },
  { field: 'category', header: 'Category' },
  { field: 'assignedTo', header: 'Assigned To' },
  { field: 'status', header: 'Status' },
];
onSearchChange() {
  const keyword = this.searchText.toLowerCase();
  this.filteredData = this.assets.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(keyword)
    )
  );
}

onAddAsset()
{
  
}
onEdit(item: AssetModel) {
    console.log('Edit asset:', item);
    // Implement edit logic
  }

onDelete(item: AssetModel) {
    console.log('Delete asset:', item);
    // Implement delete logic
  }

onView(item: AssetModel) {
    console.log('View asset:', item);
    // Implement view logic
  }
}
