import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
    create(createCityDto: CreateCityDto) {
        return 'This action adds a new city';
    }


    @InjectEntityManager()
    entityManager: EntityManager;

    async findAll() {
        // 这里创建了两个 city 的 entity，第二个的 parent 指定为第一个
        // const city = new City();
        // city.name = '华北';
        // // 用 save 保存
        // await this.entityManager.save(city);

        // const cityChild = new City()
        // cityChild.name = '山东'
        // const parent = await this.entityManager.findOne(
        //     City, 
        //     {
        //         where: {
        //             name: '华北'
        //         }
        //     }
        // );

        // if (parent) {
        //     cityChild.parent = parent
        // }

        // await this.entityManager.save(City, cityChild)

        // // 然后再 getTreeRepository 调用 findTrees 把数据查出来。
        // return this.entityManager.getTreeRepository(City).findTrees();





        // const city = new City();
        // city.name = '华南';
        // await this.entityManager.save(city);

        // const cityChild1 = new City()
        // cityChild1.name = '云南'
        // const parent = await this.entityManager.findOne(
        //     City,
        //     {
        //         where: {
        //             name: '华南'
        //         }
        //     }
        // );
        // if (parent) {
        //     cityChild1.parent = parent
        // }
        // await this.entityManager.save(City, cityChild1)

        // const cityChild2 = new City()
        // cityChild2.name = '昆明'

        // const parent2 = await this.entityManager.findOne(
        //     City,
        //     {
        //         where: {
        //             name: '云南'
        //         }
        //     }
        // );
        // if (parent) {
        //     cityChild2.parent = parent2
        // }
        // await this.entityManager.save(City, cityChild2)

        // return this.entityManager.getTreeRepository(City).findTrees();




        // findRoots 查询的是所有根节点
        // return this.entityManager.getTreeRepository(City).findRoots();



        // findDescendantsTree 是查询某个节点的所有后代节点。
        // const parent = await this.entityManager.findOne(City, {
        //     where: {
        //          name: '云南'
        //     }
        // });
        // return this.entityManager.getTreeRepository(City).findDescendantsTree(parent)



        // findAncestorsTree 是查询某个节点的所有祖先节点
        // const parent = await this.entityManager.findOne(City, {
        //     where: {
        //         name: '云南'
        //     }
        // });
        // return this.entityManager.getTreeRepository(City).findAncestorsTree(parent)



        // 这里换成 findAncestors、findDescendants 就是用扁平结构返回
        // const parent = await this.entityManager.findOne(City, {
        //     where: {
        //         name: '云南'
        //     }
        // });
        // return this.entityManager.getTreeRepository(City).findDescendants(parent)



        // 把 findTrees 换成 find 也是会返回扁平的结构
        // return this.entityManager.getTreeRepository(City).find();



        // 调用 countAncestors 和 countDescendants 来计数
        // const parent = await this.entityManager.findOne(City, {
        //     where: {
        //         name: '云南'
        //     }
        // });
        // return this.entityManager.getTreeRepository(City).countAncestors(parent)




        /**
         * materialized-path 模式
         */
        // const city = new City();
        // city.name = '华北';
        // await this.entityManager.save(city);

        // const cityChild = new City()
        // cityChild.name = '山东'
        // const parent = await this.entityManager.findOne(City, {
        //     where: {
        //         name: '华北'
        //     }
        // });
        // if (parent) {
        //     cityChild.parent = parent
        // }
        // await this.entityManager.save(City, cityChild)

        return this.entityManager.getTreeRepository(City).findTrees();
    }


    findOne(id: number) {
        return `This action returns a #${id} city`;
    }

    update(id: number, updateCityDto: UpdateCityDto) {
        return `This action updates a #${id} city`;
    }

    remove(id: number) {
        return `This action removes a #${id} city`;
    }
}
