/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserDetailService } from './user-detail.service';

describe('Service: UserDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDetailService]
    });
  });

  it('should ...', inject([UserDetailService], (service: UserDetailService) => {
    expect(service).toBeTruthy();
  }));
});
