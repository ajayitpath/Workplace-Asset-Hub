import { Component } from '@angular/core';
import { ApiAssetResponse, Asset } from '../../shared/Model/asset.model';
import { AssetService } from './Services/asset.service';
import { forkJoin } from 'rxjs';
import { CategoryService } from '../assestcategories/Services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

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
  categoryList: { label: string | number; value: string }[] = [];

  columns = [
    { field: 'AssetName', header: 'Asset Name' },
    { field: 'CategoryName', header: 'Category' },
    { field: 'Brand', header: 'Brand' },
    { field: 'Model', header: 'Model' },
    { field: 'Specification', header: 'Specification' },
    { field: 'QuantityTotal', header: 'Total Quantity' },
  ];

  constructor(
    private assetService: AssetService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService   
  ) { }

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
        console.log('Assets loaded:', assets);
        console.log('Categories loaded:', categories);

        const categoryMap = new Map<string, string>(
          categories.map(cat => [String(cat.CategoryId), cat.CategoryName])
        );

        this.assets = assets.map(asset => {
          const categoryId = String(asset.categoryId);
          const categoryLabel = categoryMap.get(categoryId) || 'Unknown Category';

          return {
            ...asset,
            categoryName: categoryLabel
          };
        });

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
    this.isEditMode = false;
    this.selectedAsset = null;
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

    this.showForm = true;
  }

  onEdit(id: string): void {
    this.isEditMode = true;
    this.selectedAssetId = id;
    this.selectedAsset = null;
    this.showForm = false;

    this.assetService.getAssetById(id).subscribe({
      next: (asset: ApiAssetResponse) => {
        this.selectedAsset = asset;
        this.showForm = true;
      },
      error: err => {
        console.error('Error fetching asset:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch asset details.' });
      }
    });
  }

  shouldRenderForm(): boolean {
    if (this.isEditMode) {
      return this.selectedAsset !== null;
    }
    return this.showForm;
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

  getCategoryNameById(id: string): string {
    const category = this.categoryList.find(cat => cat.value === id);
    return category ? String(category.label) : 'Unknown';
  }

  onSubmit(): void {
    if (this.assetForm.invalid) return;

    const payload: Asset = this.assetForm.value;

    if (this.isEditMode && this.selectedAssetId) {
      this.assetService.updateAsset(this.selectedAssetId, payload).subscribe({
        next: () => {
          this.showForm = false;
          this.resetFormState();
          this.loadAssets();
        },
        error: err => console.error('Error updating asset:', err)
      });
    } else {
      this.assetService.createAsset(payload).subscribe({
        next: () => {
          this.showForm = false;
          this.resetFormState();
          this.loadAssets();
        },
        error: err => console.error('Error creating asset:', err)
      });
    }
  }

  onCancel(): void {
    this.showForm = false;
    this.resetFormState();
  }

  private resetFormState(): void {
    this.assetForm.reset({
      assetName: '',
      assetCode: '',
      categoryId: '',
      brand: '',
      model: '',
      specification: '',
      quantityTotal: 1
    });
    this.selectedAssetId = null;
    this.selectedAsset = null;
    this.isEditMode = false;
  }

  onView(id: string): void {
    debugger;
    console.log('View Asset ID:', id);
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
    this.resetFormState();
    if (reload) this.loadAssets();
  }

  get globalFilterFields(): string[] {
    return this.columns.map(c => c.field);
  }
}