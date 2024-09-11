import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'
import * as packageConfig from '../package.json'

export const generateDocument = app => {
    const options = new DocumentBuilder()
        // 标题
        .setTitle(packageConfig.name)

        // 描述
        .setDescription(packageConfig.description)

        // 版本号
        .setVersion(packageConfig.version)

        // jwt 允许token鉴权
        .addBearerAuth()

        // 自动完成
        .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('/api/doc', app, document)
}
