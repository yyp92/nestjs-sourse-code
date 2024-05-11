import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
    @Inject('REDIS_CLIENT') 
    private redisClient: RedisClientType;

    // 传入 key 和位置信息，底层调用 redis 的 geoadd 来添加数据
    async geoAdd(
        key: string,
        posName: string,
        posLoc: [number, number]
    ) {
        return await this.redisClient.geoAdd(
            key,
            {
                longitude: posLoc[0],
                latitude: posLoc[1],
                member: posName
            }
        )
    }

    // 查询位置列表的接口
    async geoPos(key: string, posName: string) {
        const res = await this.redisClient.geoPos(key, posName);
    
        return {
            name: posName,
            longitude: res[0].longitude,
            latitude: res[0].latitude
        }
    }
    
    async geoList(key: string) {
        // 因为 geo 信息底层使用 zset 存储的，所以查询所有的 key 使用 zrange。
        const positions = await this.redisClient.zRange(key, 0, -1);
    
        const list = [];
        for (let i = 0; i < positions.length; i++) {
            const pos = positions[i];
            const res = await this.geoPos(key, pos);
            list.push(res);
        }

        return list;
    }


    // * 搜索附近的点的接口
    // 传入 key，经纬度、搜索半径，返回附近的点
    async geoSearch(
        key: string,
        pos: [number, number],
        radius: number
    ) {
        // 先用 geoRadius 搜索半径内的点
        const positions = await this.redisClient.geoRadius(
            key,
            {
                longitude: pos[0],
                latitude: pos[1]
            },
            radius,
            'km'
        );
    
        const list = [];
        for (let i = 0; i < positions.length; i++) {
            const pos = positions[i];

            // 然后再用 geoPos 拿到点的经纬度返回
            const res = await this.geoPos(key, pos);
            
            list.push(res);
        }

        return list;
    }
}
