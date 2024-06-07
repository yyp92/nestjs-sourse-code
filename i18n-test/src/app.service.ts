import { Inject, Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class AppService {
    // 注入 I18nService，从资源包中取 test.hello 的值，也就是对应 test.json 里的 hello 的值，用当前的语言。
    @Inject()
    i18n: I18nService;

    getHello(): string {
        return this.i18n.t(
            'test.hello',
            {
                lang: I18nContext.current().lang,
                args: {
                    name: 'guang'
                }
            }
        )
    }
}

