import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditCategoriesComponent } from './add-edit-categories.component';
describe('AddEditComponent', () => {
  let component: AddEditCategoriesComponent;
  let fixture: ComponentFixture<AddEditCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
