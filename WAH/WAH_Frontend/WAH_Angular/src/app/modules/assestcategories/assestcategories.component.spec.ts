import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssestcategoriesComponent } from './assestcategories.component';

describe('AssestcategoriesComponent', () => {
  let component: AssestcategoriesComponent;
  let fixture: ComponentFixture<AssestcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssestcategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssestcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
