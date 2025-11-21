import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('API')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({ summary: 'Estado del servicio' })
  @ApiResponse({ status: 200, description: 'Mensaje de estado' })
  getHello(): Object {
    return this.appService.getHello();
  }
}
