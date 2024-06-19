import { TestBed } from '@angular/core/testing';

import { CardSchemesService } from './card-schemes.service';

describe('CardSchemesService', () => {
  let service: CardSchemesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardSchemesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
