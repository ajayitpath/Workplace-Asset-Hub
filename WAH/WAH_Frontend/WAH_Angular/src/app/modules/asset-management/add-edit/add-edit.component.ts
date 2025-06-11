import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetService } from '../Services/asset.service';
import { ApiAssetResponse, Asset } from '../../../shared/Model/asset.model';
import { CategoryService } from '../../assestcategories/Services/category.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit',
  standalone: false,
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css'
})
export class AddEditComponent {
  @Input() isEditMode: boolean = false;
  @Input() assetData: ApiAssetResponse | null = null;
  @Output() formClose = new EventEmitter<boolean>();

  assetForm!: FormGroup;
  selectedAssetId: string | null = null;
  categoryList: { label: string; value: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private assetService: AssetService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories();

    if (this.isEditMode && !this.assetData) {
      this.loadAssetFromRoute();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['assetData'] && this.assetForm) {
      if (this.assetData && this.isEditMode) {
        this.patchFormWithAssetData();
      } else if (!this.assetData && !this.isEditMode) {
        this.resetForm();
      }
    }

    // Handle edit mode changes
    if (changes['isEditMode'] && this.assetForm) {
      if (!this.isEditMode) {
        this.resetForm();
      }
    }
  }

  initializeForm(): void {
    this.assetForm = this.fb.group({
      assetId: [null],
      assetName: ['', Validators.required],
      assetCode: ['', Validators.required],
      categoryId: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      specification: ['', Validators.required],
      quantityTotal: [1, [Validators.required, Validators.min(1)]],
    });
  }
  patchFormWithAssetData(): void {
    if (this.assetData) {
      this.selectedAssetId = this.assetData.AssetId;
      this.assetForm.patchValue({
        assetId: this.assetData.AssetId,
        assetName: this.assetData.AssetName,
        assetCode: this.assetData.AssetCode,
        categoryId: this.assetData.CategoryId,
        brand: this.assetData.Brand || '',
        model: this.assetData.Model || '',
        specification: this.assetData.Specification || '',
        quantityTotal: this.assetData.QuantityTotal || 1,
      });
    }
  }

  private resetForm(): void {
    this.assetForm.reset({
      assetId: null,
      assetName: '',
      assetCode: '',
      categoryId: '',
      brand: '',
      model: '',
      specification: '',
      quantityTotal: 1
    });
    this.selectedAssetId = null;
  }

  loadAssetFromRoute(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if (idFromRoute) {
      this.selectedAssetId = idFromRoute;
      this.assetService.getAssetById(idFromRoute).subscribe({
        next: (data) => {
          this.assetData = data;
          this.patchFormWithAssetData();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Fetch Failed',
            detail: 'Failed to load asset details from route.'
          });
        }
      });
    }
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: data => {
        this.categoryList = data.map((cat: any) => ({
          label: cat.CategoryName,
          value: cat.CategoryId
        }));
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Load Failed',
          detail: 'Unable to fetch category list.'
        });
      }
    });
  }

  onSubmit(): void {
    if (this.assetForm.valid) {
      const payload: Asset = this.assetForm.value;

      const assetId = this.selectedAssetId || payload.assetId;

      if (this.isEditMode && assetId) {
        this.assetService.updateAsset(assetId, payload).subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Asset Updated',
              detail: 'The asset has been updated successfully.'
            });
            this.formClose.emit(true);
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Update Failed',
              detail: 'An error occurred while updating the asset.'
            });
          }
        });
      } else {
        this.assetService.createAsset(payload).subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Asset Created',
              detail: 'The asset has been created successfully.'
            });
            this.formClose.emit(true);
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Creation Failed',
              detail: 'An error occurred while creating the asset.'
            });
          }
        });
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.assetForm.controls).forEach(key => {
        this.assetForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.resetForm();
    this.formClose.emit(false);
  }
}