import { Component } from '@angular/core';
import { ApiAssetResponse, Asset } from '../../shared/Model/asset.model';
import { AssetService } from './Services/asset.service';
import { forkJoin } from 'rxjs';
import { CategoryService } from './Services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-asset-management',
  standalone: false,
  templateUrl: './asset-management.component.html',
  styleUrl: './asset-management.component.css'
})
export class AssetManagementComponent {
    assets: Asset[] = [];
  filteredData: Asset[] = [];
  searchText = '';
showViewDialog: boolean = false;
viewAsset: ApiAssetResponse | null = null;
  showForm = false;
  isEditMode = false;
  selectedAssetId: string | null = null;
selectedAsset: ApiAssetResponse | null = null; 
  assetForm!: FormGroup;
  categoryList: { label: string; value: string }[] = [];

  columns = [
    { field: 'AssetName', header: 'Asset Name' },
    { field: 'categoryName', header: 'Category' },
    { field: 'Brand', header: 'Brand' },
    { field: 'Model', header: 'Model' },
    { field: 'Specification', header: 'Specification' },
    { field: 'QuantityTotal', header: 'Total Quantity' },
  ];

  constructor(
    private assetService: AssetService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadAssets();
    this.loadCategories();
    this.initializeForm();
  }

  loadAssets(): void {
    forkJoin({
      assets: this.assetService.getAllAssets(),
      categories: this.categoryService.getAllCategories()
    }).subscribe({
      next: ({ assets, categories }) => {
        const categoryMap = new Map(categories.map(cat => [cat.label, cat.value]));
        this.assets = assets.map(asset => ({
          ...asset,
          categoryName: categoryMap.get(asset.categoryId) || 'Unknown Category'
        }));
        this.filteredData = this.assets;
      },
      error: err => console.error('Error fetching assets:', err)
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: data => {
        this.categoryList = data.map((cat: any) => ({
          label: cat.CategoryName,
          value: cat.CategoryId
        }));
      },
      error: err => console.error('Error fetching categories:', err)
    });
  }

  initializeForm(): void {
    this.assetForm = this.fb.group({
      assetName: ['', Validators.required],
      assetCode: ['', Validators.required],
      categoryId: ['', Validators.required],
      brand: [''],
      model: [''],
      specification: [''],
      quantityTotal: [1, [Validators.required, Validators.min(1)]]
    });
  }

  onSearchChange(): void {
    const keyword = this.searchText.toLowerCase();
    this.filteredData = this.assets.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(keyword)
      )
    );
  }

  onAddAsset(): void {
    debugger
    this.showForm = true;
    this.isEditMode = false;
    this.selectedAssetId = null;

    this.assetForm.reset({
      assetName: '',
      assetCode: '',
      categoryId: '',
      brand: '',
      model: '',
      specification: '',
      quantityTotal: 1
    });
  }

onEdit(id: string): void {
  debugger
  this.showForm = true;
  this.isEditMode = true;
  this.selectedAssetId = id;
  this.assetService.getAssetById(id).subscribe({
    next: (asset: ApiAssetResponse) => {
      this.assetForm.patchValue({
        assetName: asset.AssetName,
        assetCode: asset.AssetCode,
        categoryId: asset.CategoryId,
        brand: asset.Brand,
        model: asset.Model,
        specification: asset.Specification,
        quantityTotal: asset.QuantityTotal
      });
      this.selectedAsset = asset;
      console.log('Editing asset:', this.assetForm.value);
    },
    error: err => console.error('Error fetching asset for edit:', err)
  });
}



onDelete(id: string): void {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete this asset?',
    header: 'Delete Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.assetService.deleteAsset(id).subscribe({
        next: () => this.loadAssets(),
        error: err => console.error('Error deleting asset:', err)
      });
    }
  });
}

  onSubmit(): void {
    if (this.assetForm.invalid) return;

    const payload: Asset = this.assetForm.value;

    if (this.isEditMode && this.selectedAssetId) {
      this.assetService.updateAsset(this.selectedAssetId, payload).subscribe({
        next: () => {
          this.showForm = false;
          this.loadAssets();
        },
        error: err => console.error('Error updating asset:', err)
      });
    } else {
      this.assetService.createAsset(payload).subscribe({
        next: () => {
          this.showForm = false;
          this.loadAssets();
        },
        error: err => console.error('Error creating asset:', err)
      });
    }
  }

  onCancel(): void {
    this.showForm = false;
  }
onView(id: string): void {
  this.assetService.getAssetById(id).subscribe({
    next: asset => {
      this.viewAsset = asset;
      this.showViewDialog = true;
      console.log('Viewing asset:', asset);
    },
    error: err => console.error('Error fetching asset for view:', err)
  });
}

  onFormClose(reload: boolean = false): void {
    this.showForm = false;
    this.selectedAsset = null;
    if (reload) this.loadAssets();
  }
  get globalFilterFields(): string[] {
    return this.columns.map(c => c.field);
  }

}
