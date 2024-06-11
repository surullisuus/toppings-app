import { TestBed } from '@angular/core/testing';

import { Esp8266Service } from './esp8266.service';

describe('Esp8266Service', () => {
  let service: Esp8266Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Esp8266Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
