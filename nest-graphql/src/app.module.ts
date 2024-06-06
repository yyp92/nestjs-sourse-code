import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentResolver } from './student/student.resolver';

@Module({
    imports: [
        GraphQLModule.forRoot({
            driver: ApolloDriver,
            // typePaths 也就是 schema 文件的位置
            typePaths: ['./**/*.graphql'],
            playground: false,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
        })
    ],
    controllers: [AppController],
    providers: [AppService, StudentResolver],
})
export class AppModule {}
