import { TestBed } from '@angular/core/testing';

import { PokeregionService } from './pokeregion.service';

describe('PokeregionService', () => {
  let service: PokeregionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeregionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
