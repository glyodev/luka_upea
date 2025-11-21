import { Test, TestingModule } from '@nestjs/testing';
import { UnidadMovimientoService } from './unidad-movimiento.service';

describe('UnidadMovimientoService', () => {
  let service: UnidadMovimientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnidadMovimientoService],
    }).compile();

    service = module.get<UnidadMovimientoService>(UnidadMovimientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
