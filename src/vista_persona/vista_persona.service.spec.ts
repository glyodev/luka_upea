import { Test, TestingModule } from '@nestjs/testing';
import { VistaPersonaService } from './vista_persona.service';

describe('VistaPersonaService', () => {
  let service: VistaPersonaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VistaPersonaService],
    }).compile();

    service = module.get<VistaPersonaService>(VistaPersonaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
