import { Component, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from './Services/category.service';
import { AssetCategory } from '../../shared/Model/category.model';

@Component({
  selector: 'app-assestcategories',
  standalone: false,
  templateUrl: './assestcategories.component.html',
  styleUrl: './assestcategories.component.css'
})
export class AssestcategoriesComponent {
  @Input() idFieldName: string = 'CategoryId';
  filteredData: AssetCategory[] = [];
  title = 'Asset Categories';
  columns = [
    { field: 'CategoryName', header: 'Category Name' },
  ];
  allCategories: AssetCategory[] = [];
  filteredCategories: AssetCategory[] = [];
  searchText: string = '';
  showForm: boolean = false;
  isEditMode: boolean = false;
  selectedCategory: AssetCategory | null = null;
  showViewDialog: boolean = false;
  viewCategory: AssetCategory | null = null;
  selectedAssetId: string | null = null;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.allCategories = categories;
        this.filteredCategories = categories;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load categories'
        });
      }
    });
  }
  onEdit(id: string): void {
    this.categoryService.getCategoryById(id).subscribe({

      next: (asset: AssetCategory) => {
        this.selectedCategory = asset;
        this.isEditMode = true;
        this.showForm = true;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Cannot edit this category' });
      }
    });
  }
  onView(id: string): void {
    this.categoryService.getCategoryById(id).subscribe({
      next: (category: any) => {
        this.viewCategory = {
          CategoryId: category.categoryId,
          CategoryName: category.CategoryName
        };
        this.showViewDialog = true;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category not found' });
      }
    });
  }
  onDelete(id: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this category?',
      accept: () => {
        this.categoryService.deleteCategory(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Category deleted' });
            this.loadCategories(); // refresh
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Delete failed' });
          }
        });
      }
    });
  }
  onSearchChange(): void {
    const query = this.searchText.toLowerCase();
    this.filteredCategories = this.allCategories.filter(category =>
      category.CategoryName.toLowerCase().includes(query)
    );
  }
  onAddCategory(): void {
    this.isEditMode = false;
    this.selectedCategory = null;
    this.showForm = true;
  }
  onFormClose(refresh: boolean): void {
    this.showForm = false;
    this.selectedCategory = null;
    if (refresh) {
      this.searchText = ''; // reset search
      this.loadCategories(); //  reloads data
    }
  }

}