import { TestBed } from '@angular/core/testing';

import { AssetrequestapproveService } from './assetrequestapprove.service';

describe('AssetrequestapproveService', () => {
  let service: AssetrequestapproveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetrequestapproveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
