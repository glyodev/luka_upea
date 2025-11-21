import { Test, TestingModule } from '@nestjs/testing';
import { VistaPersonaController } from './vista_persona.controller';
import { VistaPersonaService } from './vista_persona.service';

describe('VistaPersonaController', () => {
  let controller: VistaPersonaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VistaPersonaController],
      providers: [VistaPersonaService],
    }).compile();

    controller = module.get<VistaPersonaController>(VistaPersonaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
