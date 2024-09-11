import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path'

const databaseType: DataSourceOptions['type'] = 'mongodb'

export const DatabaseProviders = [
    {
        provide: 'MONGODB_DATA_SOURCE',

        // url地址，用户名，密码
        inject: [ConfigService],

        useFactory: async (configService: ConfigService) => {
            const config = {
                type: databaseType,
                url: configService.get<string>('database.url'),
                username: configService.get<string>('database.user'),
                password: configService.get<string>('database.pass'),
                database: configService.get<string>('database.name'),
                
                // 入口
                entities: [path.join(__dirname, `../../**/*.mongo.entry{.ts,.js}`)],
                logging: configService.get<boolean>('database.logging'),
                synchronize: configService.get<boolean>('database.synchronize'),

                // useNewUrlParser: true,
                // 启用新版的 Server Discover and Monitoring engine
                useUnifiedTopology: true, 
            }

            const ds = new DataSource(config)
            await ds.initialize()

            return ds
        }
    }
]