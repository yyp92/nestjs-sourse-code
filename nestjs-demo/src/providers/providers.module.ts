import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';

@Module({
    controllers: [ProvidersController],
    providers: [
        ProvidersService,

        {
            provide: 'providers1',
            useClass: ProvidersService
        },

        {
            provide: 'providers2',
            useValue: {
                name: 'aa',
                age: 20
            }
        },
        
        {
            provide: 'providers3',
            useFactory: () => {
                return {
                    name: 'bb',
                    desc: 'cc'
                }
            }
        },

        {
            provide: 'providers4',
            useFactory: (providers2: {name: string}, providersService: ProvidersService) => {
                return {
                    name: providers2.name,
                    desc: providersService.create('')
                }
            },
            inject: ['providers2', ProvidersService]
        },

        {
            provide: 'providers5',
            useFactory: async () => {
                await new Promise((resolve, reject) => {
                    setTimeout(resolve, 3000)
                })

                return {
                    name: 'ccc',
                    desc: 'ddd'
                }
            }
        },

        {
            provide: 'providers6',
            useExisting: 'providers3'
        }
    ],
})
export class ProvidersModule {}
