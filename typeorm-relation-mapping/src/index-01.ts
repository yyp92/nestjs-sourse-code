/**
 *  一对一的映射和关联 CRUD
 */

import { IdCard } from './entity/IdCard';
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {
    const user = new User()
    user.firstName = "guang"
    user.lastName = "guang"
    user.age = 20

    const idCard = new IdCard()
    idCard.cardName = '1111111'
    idCard.user = user

    // await AppDataSource.manager.save(user)
    // await AppDataSource.manager.save(idCard)

    
    // 查找出来
    // const ics = await AppDataSource.manager.find(IdCard);
    // console.log(ics);

    // 只需要声明下 relations 关联查询就好了：
    // const ics = await AppDataSource.manager.find(IdCard, {
    //     relations: {
    //         user: true
    //     }
    // });
    // console.log(ics);

    // 当然，你也可以用 query builder 的方式来查询：
    // const ics = await AppDataSource.manager.getRepository(IdCard)
    //     .createQueryBuilder("ic")
    //     .leftJoinAndSelect("ic.user", "u")
    //     .getMany();
    // console.log(ics);

    // 或者也可以直接用 EntityManager 创建 queryBuilder 来连接查询：
    // const ics = await AppDataSource.manager.createQueryBuilder(IdCard, "ic")
    //     .leftJoinAndSelect("ic.user", "u")
    //     .getMany();
    // console.log(ics);

    // 不过现在我们只是在 idCard 里访问 user，如果想在 user 里访问 idCard 呢？
    const user1 = await AppDataSource.manager.find(User, {
        relations: {
            idCard: true
        }
    });
    console.log(user1);

}).catch(error => console.log(error))
