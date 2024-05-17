import { Injectable } from '@nestjs/common';
import { createTransport, Transporter} from 'nodemailer';

@Injectable()
export class EmailService {
    transporter: Transporter
    
    constructor() {
        this.transporter = createTransport({
            host: "smtp.qq.com",
            port: 587,
            secure: false,
            auth: {
                // user: '你的邮箱地址',
                // pass: '你的授权码'
                user: '892973319@qq.com',
                pass: 'oghhoyhlsaqbbdjh'
            },
        });
    }

    async sendMail({ to, subject, html }) {
        await this.transporter.sendMail({
            from: {
                name: '会议室预定系统',
                // address: '你的邮箱地址'
                address: '892973319@qq.com'
            },
            to,
            subject,
            html
        });
    }
}
