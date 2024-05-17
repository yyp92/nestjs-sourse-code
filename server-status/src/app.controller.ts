import { Controller, Get } from '@nestjs/common';
import * as os from 'os';
import * as nodeDiskInfo from 'node-disk-info';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    // cpu
    @Get('status')
    status() {
        // 返回的数组元素个数就是 cpu 数
        // return os.cpus();

        /**
         * mes.user、times.sys、times.idle 分别代表用户代码占用的 cpu 时间、系统代码占用的 cpu 时间，空闲的 cpu 时间
         */
        const cpus = os.cpus();
        const cpuInfo = cpus.reduce(
            (info, cpu) => {
                // cpu 的数量
                info.cpuNum += 1;
                info.user += cpu.times.user;
                info.sys += cpu.times.sys;
                info.idle += cpu.times.idle;
                // 总的 cpu 时间
                info.total += cpu.times.user + cpu.times.sys + cpu.times.idle;

                return info;
            },
            {
                user: 0,
                sys: 0,
                idle: 0,
                total: 0,
                cpuNum: 0
            },
        );
        
        const cpu = {
            cpuNum: cpuInfo.cpuNum,

            // cpu 的系统使用率就是 sys/total
            sys: ((cpuInfo.sys / cpuInfo.total) * 100).toFixed(2),

            // 用户使用率是 user/total
            used: ((cpuInfo.user / cpuInfo.total) * 100).toFixed(2),

            // 空置率就是 idle/total
            free: ((cpuInfo.idle / cpuInfo.total) * 100).toFixed(2),
        };

        return cpu;
    }

    
    @Get('status1')
    async status1() {
        return {
            // cpu
            cpu: this.getCpuInfo(),

            // 内存信息
            mem: this.getMemInfo(),

            // 磁盘信息
            dist: await this.getDiskStatus(),

            // 返回其他的服务器信息
            sys: this.getSysInfo()
        }
    }

    bytesToGB(bytes) {
        const gb = bytes / (1024 * 1024 * 1024);
        return gb.toFixed(2);
    }

    async getDiskStatus() {
        const disks = await nodeDiskInfo.getDiskInfoSync();
    
        const sysFiles = disks.map((disk: any) => {
            return {
                // 路径
                dirName: disk._mounted,
                // 文件系统
                typeName: disk._filesystem,
                // 总大小
                total: this.bytesToGB(disk._blocks) + 'GB',
                // 已用大小
                used: this.bytesToGB(disk._used) + 'GB',
                // 可用大小
                free: this.bytesToGB(disk._available) + 'GB',
                // 已用百分比
                usage: ((disk._used / disk._blocks || 0) * 100).toFixed(2),
            };
        });

        return sysFiles;
    }

    getMemInfo() {
        // 总内存
        const totalMemory = os.totalmem();
        // 空闲内存
        const freeMemory = os.freemem();
        // 已使用的内存
        const usedMemory = totalMemory - freeMemory;
        // 内存使用率
        const memoryUsagePercentage = (((totalMemory - freeMemory) / totalMemory) * 100).toFixed(2);

        const mem = {
            // total: totalMemory,
            // used: usedMemory,
            // free: freeMemory,

            total: this.bytesToGB(totalMemory),
            used: this.bytesToGB(usedMemory),
            free: this.bytesToGB(freeMemory),
            usage: memoryUsagePercentage,
        };

        return mem;
    }

    getCpuInfo() {
        const cpus = os.cpus();
        const cpuInfo = cpus.reduce(
            (info, cpu) => {
                info.cpuNum += 1;
                info.user += cpu.times.user;
                info.sys += cpu.times.sys;
                info.idle += cpu.times.idle;
                info.total += cpu.times.user + cpu.times.sys + cpu.times.idle;

                return info;
            },
            {
                user: 0,
                sys: 0,
                idle: 0,
                total: 0,
                cpuNum: 0
            },
        );

        const cpu = {
            cpuNum: cpuInfo.cpuNum,
            sys: ((cpuInfo.sys / cpuInfo.total) * 100).toFixed(2),
            used: ((cpuInfo.user / cpuInfo.total) * 100).toFixed(2),
            free: ((cpuInfo.idle / cpuInfo.total) * 100).toFixed(2),
        };

        return cpu;
    }

    getSysInfo() {
        return {
            // 主机名
            computerName: os.hostname(),
            computerIp: this.getServerIP(),
            // 操作系统
            osName: os.platform(),
            // 操作系统架构
            osArch: os.arch(),
        };
    }

    getServerIP() {
        // 拿到所有网卡信息
        const nets = os.networkInterfaces();

        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                // 从中过滤出非 IPv4 的外部网卡的 ip 来返回
                if (net.family === 'IPv4' && !net.internal) {
                    return net.address;
                }
            }
        }
    }
}
