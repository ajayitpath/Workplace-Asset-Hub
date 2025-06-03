import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetService } from '../Services/asset.service';
import { ApiAssetResponse, Asset } from '../../../shared/Model/asset.model';
import { CategoryService } from '../Services/category.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-edit',
standalone: false,
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css'
})
export class AddEditComponent {
@Input() isEditMode: boolean = false;

  @Input() assetData: ApiAssetResponse | null = null; // Use ApiAssetResponse type for asset data
  @Output() formClose = new EventEmitter<boolean>();

  assetForm!: FormGroup;
  selectedAssetId: string | null = null; 
  categoryList: { label: string; value: string }[] = [];
constructor(private fb: FormBuilder, private assetService: AssetService, private categoryService: CategoryService,   private route: ActivatedRoute ) {}

ngOnInit(): void {

  this.loadCategories();
  debugger
  // If editing, fetch asset data using route param
  if (this.isEditMode) {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if (idFromRoute) {
      this.selectedAssetId = idFromRoute;
      this.assetService.getAssetById(this.selectedAssetId).subscribe((data: any) => {
        this.assetData = data;
        this.initializeForm(); // initialize form once data is fetched
      });
    }
  } else {
    this.initializeForm(); // for create mode
  }
}
ngOnChanges(changes: SimpleChanges): void {
  if (changes['assetData'] && this.assetData && this.isEditMode) {
    this.initializeForm();
  }
}
initializeForm(): void {
  this.assetForm = this.fb.group({
    assetId: [this.assetData?.AssetId || null ],
    assetName: [this.assetData?.AssetName || '', Validators.required],
    assetCode: [this.assetData?.AssetCode || '', Validators.required],
    categoryId: [this.assetData?.CategoryId || ''],
    brand: [this.assetData?.Brand || ''],
    model: [this.assetData?.Model || ''],
    specification: [this.assetData?.Specification || ''],
    quantityTotal: [this.assetData?.QuantityTotal || 1, [Validators.required, Validators.min(1)]],
  });
  console.log('Asset Form initialized:', this.assetForm.value);

}

loadCategories() {
  this.categoryService.getAllCategories().subscribe(data => {
    this.categoryList = data.map((cat: any) => ({
         label: cat.CategoryName,
      value: cat.CategoryId
    }));
    console.log('Categories loaded:', this.categoryList);
  });
}

onSubmit() {
  debugger
  if (this.assetForm.valid) {
    const payload: Asset = this.assetForm.value;
    this.selectedAssetId= payload.assetId;
    if (this.isEditMode && this.selectedAssetId) {
      // Update Asset
      debugger;
      this.assetService.updateAsset(this.selectedAssetId, payload).subscribe({
        next: (response) => {
          console.log('Asset updated:', response);
          this.formClose.emit(true); 
        },
        error: (err) => {
          console.error('Error updating asset:', err);
        }
      });
    } else {
      // Create Asset
      debugger;
      this.assetService.createAsset(payload).subscribe({
        next: (response) => {
          console.log('Asset created:', response);
          this.formClose.emit(true); 
        },
        error: (err) => {
          console.error('Error creating asset:', err.error);
        }
      });
    }
  }
}


  onCancel() {
    this.formClose.emit(false);
  }
}
