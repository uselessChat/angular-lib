import { TestBed } from '@angular/core/testing';

import { AngularReactiveUtilsService } from './angular-reactive-utils.service';

describe('AngularReactiveUtilsService', () => {
  let service: AngularReactiveUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularReactiveUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
