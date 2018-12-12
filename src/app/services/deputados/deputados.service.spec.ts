import { TestBed } from '@angular/core/testing';

import { DeputadosService } from './deputados.service';

describe('DeputadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeputadosService = TestBed.get(DeputadosService);
    expect(service).toBeTruthy();
  });
});
