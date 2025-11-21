import { Test, TestingModule } from '@nestjs/testing';
import { UnidadMovimientoController } from './unidad-movimiento.controller';
import { UnidadMovimientoService } from './unidad-movimiento.service';

describe('UnidadMovimientoController', () => {
  let controller: UnidadMovimientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnidadMovimientoController],
      providers: [UnidadMovimientoService],
    }).compile();

    controller = module.get<UnidadMovimientoController>(UnidadMovimientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
