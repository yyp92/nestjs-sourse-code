import { ConfigurableModuleBuilder } from "@nestjs/common";

export interface CccModuleOptions {
    cc: number;
    dd: number;
}

// export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
//   new ConfigurableModuleBuilder<CccModuleOptions>().build();

export const {
    ConfigurableModuleClass,
    MODULE_OPTIONS_TOKEN,
    OPTIONS_TYPE,
    ASYNC_OPTIONS_TYPE
} =
    new ConfigurableModuleBuilder<CccModuleOptions>()
        .setClassMethodName('register')
        // setExtras 第一个参数是给 options 扩展啥 extras 属性，第二个参数是收到 extras 属性之后如何修改模块定义。
        .setExtras(
            {
                isGlobal: true
            },
            (definition, extras) => ({
                ...definition,
                global: extras.isGlobal,
            })
        )
        .build();
