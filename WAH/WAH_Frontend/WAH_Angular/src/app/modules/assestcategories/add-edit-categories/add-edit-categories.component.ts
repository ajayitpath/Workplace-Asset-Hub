import { Component, EventEmitter, Input, Output, SimpleChanges, } from '@angular/core';
import { AssetCategory } from '../../../shared/Model/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../Services/category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit-categories',
  standalone: false,
  templateUrl: './add-edit-categories.component.html',
  styleUrl: './add-edit-categories.component.css',
})
export class AddEditCategoriesComponent {
  categoryForm!: FormGroup;
  @Input() isEditMode: boolean = false;
  @Input() categoryData: AssetCategory | null = null;
  @Output() formClose = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
    this.initializeForm();

    if (this.isEditMode && this.categoryData) {
      this.patchFormWithData();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryData'] && this.categoryForm) {
      if (this.categoryData && this.isEditMode) {
        this.patchFormWithData();
      } else if (!this.categoryData && !this.isEditMode) {
        this.resetForm();
      }
    }
  }
  initializeForm(): void {
    this.categoryForm = this.fb.group({
      CategoryId: [null],
      CategoryName: ['', Validators.required],
    });
  }
  patchFormWithData(): void {
    if (this.categoryData) {
      this.categoryForm.patchValue({
        CategoryId: this.categoryData.CategoryId,
        CategoryName: this.categoryData.CategoryName,
      });
    }
  }

  resetForm(): void {
    this.categoryForm.reset({
      CategoryId: null,
      CategoryName: '',
    });
  }
  save(): void {
    if (this.categoryForm.valid) {
      const payload: AssetCategory = this.categoryForm.value;

      if (this.isEditMode && payload.CategoryId) {
        // Update category
        this.categoryService.updateCategory(payload.CategoryId, payload).subscribe({
          next: (res) => {
            // console.log(res.message);  
            this.messageService.add({ severity: 'success', summary: 'Success', detail: this.isEditMode ? 'Category updated' : 'Category created' });
            this.resetForm();
            this.categoryData = null;
            this.formClose.emit(true);
          },
          error: (err) => {
            // console.error('❌ Update error:', err); 
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Operation failed' });
          },
        });
      } else {
        // Create category
        const { CategoryName } = payload;
        this.categoryService
          .createCategory({ CategoryName } as AssetCategory)
          .subscribe({
            next: () => {
              this.resetForm();
              this.categoryData = null;
              this.formClose.emit(true);
            },
            error: (err) => {
              console.error('Error creating category:', err);
            },
          });
      }
    } else {
      Object.values(this.categoryForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  closeForm(refresh: boolean) {
    this.formClose.emit(refresh);
  }
}
