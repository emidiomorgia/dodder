import { TestBed } from '@angular/core/testing';

import { SecureService } from './secure.service';

describe('SecureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecureService = TestBed.get(SecureService);
    expect(service).toBeTruthy();
  });
});
