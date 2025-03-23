import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/public.strategy';

@Controller('/')
export class DefaultController {
  @Public()
  @Get('/health')
  getDefault() {
    return 'Service is healthy!';
  }
}
