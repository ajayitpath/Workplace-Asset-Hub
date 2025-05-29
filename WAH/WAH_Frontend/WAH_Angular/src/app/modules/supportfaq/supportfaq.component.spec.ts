import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportfaqComponent } from './supportfaq.component';

describe('SupportfaqComponent', () => {
  let component: SupportfaqComponent;
  let fixture: ComponentFixture<SupportfaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportfaqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportfaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
