import { Test, TestingModule } from '@nestjs/testing';
import { TipoConceptoService } from './tipo-concepto.service';

describe('TipoConceptoService', () => {
  let service: TipoConceptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoConceptoService],
    }).compile();

    service = module.get<TipoConceptoService>(TipoConceptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
