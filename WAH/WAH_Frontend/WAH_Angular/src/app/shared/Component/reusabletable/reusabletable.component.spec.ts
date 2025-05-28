import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusabletableComponent } from './reusabletable.component';

describe('ReusabletableComponent', () => {
  let component: ReusabletableComponent;
  let fixture: ComponentFixture<ReusabletableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusabletableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusabletableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
