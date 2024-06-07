import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { TodolistResolver } from './todolist.resolver';


@Module({
    imports: [
        GraphQLModule.forRoot({
            driver: ApolloDriver,
            typePaths: ['./**/*.graphql'],
            playground: false,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
        })
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService, TodolistResolver],
})
export class AppModule {}
``