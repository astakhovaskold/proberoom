import { Controller, Get } from '@nestjs/common';
// biome-ignore lint/style/useImportType: NestJS needs the runtime class for constructor metadata.
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
