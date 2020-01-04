import { TestBed, async, inject } from '@angular/core/testing';

import { DefaultGuard } from './default.guard';
import { Router } from '@angular/router';

class MockRouter {
  navigate(path) { }
}

describe('DefaultGuard', () => {

  let guard: DefaultGuard;
  let router = new MockRouter();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultGuard, { provide: Router, useValue: router }]
    });

    guard = TestBed.get(DefaultGuard);

  });

  describe('CanActivate', () => {
    it('should be false when there is a null token on sessionStorage', () => {
      spyOn(sessionStorage, 'getItem').and.returnValue(null);
      spyOn(router, 'navigate');

      let res = guard.canActivate(null, null);

      expect(router.navigate).toHaveBeenCalledWith(['login']);
      expect(res).toBeFalsy();
    });

    it('should be false when there is an empty token on sessionStorage', () => {
      spyOn(sessionStorage, 'getItem').and.returnValue('');
      spyOn(router, 'navigate');

      let res = guard.canActivate(null, null);

      expect(router.navigate).toHaveBeenCalledWith(['login']);
      expect(res).toBeFalsy();
    });

    it('should be true when there is a not null and not empty token on sessionStorage', () => {
      spyOn(sessionStorage, 'getItem').and.returnValue(null);
      spyOn(router, 'navigate');

      let res = guard.canActivate(null, null);

      expect(router.navigate).toHaveBeenCalledWith(['login']);
      expect(res).toBeFalsy();
    });
  });

  

});
