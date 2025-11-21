import { Test, TestingModule } from '@nestjs/testing';
import { TipoConceptoController } from './tipo-concepto.controller';
import { TipoConceptoService } from './tipo-concepto.service';

describe('TipoConceptoController', () => {
  let controller: TipoConceptoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoConceptoController],
      providers: [TipoConceptoService],
    }).compile();

    controller = module.get<TipoConceptoController>(TipoConceptoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
