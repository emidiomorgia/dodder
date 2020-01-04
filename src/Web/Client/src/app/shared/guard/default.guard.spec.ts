import { TestBed, async, inject } from '@angular/core/testing';

import { DefaultGuard } from './default.guard';
import { Router } from '@angular/router';

class MockRouter {
  navigate(path) { }
}

describe('DefaultGuard', () => {

  let guard: DefaultGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultGuard, { provide: Router, useValue: MockRouter }]
    });

    guard = TestBed.get(DefaultGuard);
    router = TestBed.get(Router);

  });

  it('should be instantiated', () => {
    spyOn(router, 'navigate');
  });
});
