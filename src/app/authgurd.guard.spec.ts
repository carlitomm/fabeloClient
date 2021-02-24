import { TestBed, async, inject } from '@angular/core/testing';

import { AuthgurdGuard } from './authgurd.guard';

describe('AuthgurdGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthgurdGuard]
    });
  });

  it('should ...', inject([AuthgurdGuard], (guard: AuthgurdGuard) => {
    expect(guard).toBeTruthy();
  }));
});
