import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configModuleOptions } from "./configs/module-options";
import { DatabaseProviders } from "./database.providers";
import { SystemService } from './system.service';

@Module({
    // 导出模块
    exports: [SystemService, ConfigModule, ...DatabaseProviders],

    // 本模块
    providers: [SystemService, ...DatabaseProviders],

    // 导入
    imports: [
        ConfigModule.forRoot(configModuleOptions)
    ]
})
export class ShareModule {}