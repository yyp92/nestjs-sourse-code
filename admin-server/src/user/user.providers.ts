import { User } from "./entities/user.mongo.entity"

export const UserProviders = [
    {
        provide: 'USER_REPOSITORY',
        inject: ['MONGODB_DATA_SOURCE'],
        useFactory: async (appDataSource) => {
            return await appDataSource.getRepository(User)
        }
    }
]