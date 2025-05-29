import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportanalyticsComponent } from './reportanalytics.component';

describe('ReportanalyticsComponent', () => {
  let component: ReportanalyticsComponent;
  let fixture: ComponentFixture<ReportanalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportanalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
