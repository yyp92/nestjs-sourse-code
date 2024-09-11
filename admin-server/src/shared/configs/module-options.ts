import { ConfigModuleOptions } from "@nestjs/config";
import configration from "./configration";

export const configModuleOptions: ConfigModuleOptions = {
    // env 文件路径
    envFilePath: '.env',

    // 加载
    load: [configration],
}