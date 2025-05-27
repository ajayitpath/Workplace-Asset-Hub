import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetManagementComponent } from './asset-management.component';

describe('AssetManagementComponent', () => {
  let component: AssetManagementComponent;
  let fixture: ComponentFixture<AssetManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
