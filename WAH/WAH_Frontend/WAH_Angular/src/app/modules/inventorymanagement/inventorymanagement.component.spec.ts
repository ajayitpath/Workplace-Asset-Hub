import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorymanagementComponent } from './inventorymanagement.component';

describe('InventorymanagementComponent', () => {
  let component: InventorymanagementComponent;
  let fixture: ComponentFixture<InventorymanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventorymanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorymanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
