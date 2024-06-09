import { TestBed } from '@angular/core/testing';

import { ThingspeakService } from './thingspeak.service';

describe('ThingspeakService', () => {
  let service: ThingspeakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThingspeakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
