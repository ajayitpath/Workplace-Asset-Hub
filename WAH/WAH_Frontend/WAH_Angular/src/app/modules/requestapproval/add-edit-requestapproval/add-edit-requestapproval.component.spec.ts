import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRequestapprovalComponent } from './add-edit-requestapproval.component';

describe('AddEditRequestapprovalComponent', () => {
  let component: AddEditRequestapprovalComponent;
  let fixture: ComponentFixture<AddEditRequestapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditRequestapprovalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRequestapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
