import { Test, type TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
    let appController: AppController;
    let appService: jest.Mocked<AppService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [
                {
                    provide: AppService,
                    useValue: { getHello: jest.fn() },
                },
            ],
        }).compile();

        appController = module.get(AppController);
        appService = module.get(AppService);
    });

    describe('getHello', () => {
        it('delegates to AppService and returns its result', () => {
            appService.getHello.mockReturnValue('Hello World!');

            expect(appController.getHello()).toBe('Hello World!');
            expect(appService.getHello).toHaveBeenCalledTimes(1);
        });
    });
});
