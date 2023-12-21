import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { In } from "typeorm";


AppDataSource.initialize()
    .then(async () => {
        // 增加
        // const user = new User()
        // user.firstName = "aaa"
        // user.lastName = "bbb"
        // user.age = 25


        // 修改
        // const user = new User()
        // user.id = 1;
        // user.firstName = "aaa111"
        // user.lastName = "bbb"
        // user.age = 25
        // await AppDataSource.manager.save(user)


        // 批量插入
        // await AppDataSource.manager.save(User, [
        //     { firstName: 'ccc', lastName: 'ccc', age: 21},
        //     { firstName: 'ddd', lastName: 'ddd', age: 22},
        //     { firstName: 'eee', lastName: 'eee', age: 23}
        // ]);


        // 批量修改
        // await AppDataSource.manager.save(User, [
        //     { id: 2 ,firstName: 'ccc111', lastName: 'ccc', age: 21},
        //     { id: 3 ,firstName: 'ddd222', lastName: 'ddd', age: 22},
        //     { id: 4, firstName: 'eee333', lastName: 'eee', age: 23}
        // ]);


        // 删除和批量删除
        // await AppDataSource.manager.delete(User, 1);
        // await AppDataSource.manager.delete(User, [2, 3]);


        // 用 remove 方法
        // delete 和 remove 的区别是，delete 直接传 id、而 remove 则是传入 entity 对象。
        // const user = new User();
        // user.id = 1;
        // await AppDataSource.manager.remove(User, user);


        // 查询是使用 find 方法
        // await AppDataSource.manager.save(User, [
        //     { firstName: 'ccc', lastName: 'ccc', age: 21},
        //     { firstName: 'ddd', lastName: 'ddd', age: 22},
        //     { firstName: 'eee', lastName: 'eee', age: 23}
        // ]);
        // const users = await AppDataSource.manager.find(User);
        // console.log(users);
        

        // 通过 findBy 方法根据条件查询
        // const users = await AppDataSource.manager.findBy(User, {
        //     age: 23
        // });
        // console.log(users);


        // 用 findAndCount 来拿到有多少条记录
        // const [users, count] = await AppDataSource.manager.findAndCount(User);
        // console.log(users, count);


        // count 是可以指定条件的
        // const [users, count] = await AppDataSource.manager.findAndCountBy(User, {
        //     age: 23
        // })
        // console.log(users, count);


        // 除了可以查询多条，还可以查询一条，使用 findOne
        // const user = await AppDataSource.manager.findOne(User, {
        //     select: {
        //         firstName: true,
        //         age: true
        //     },
        //     where: {
        //         id: 4
        //     },
        //     order: {
        //         age: 'ASC'
        //     }
        // });
        // console.log(user);


        // findOne 只是比 find 多加了个 LIMIT 1，其余的都一样
        // const users = await AppDataSource.manager.find(User, {
        //     select: {
        //         firstName: true,
        //         age: true
        //     },
        //     where: {
        //         id: In([4, 8])
        //     },
        //     order: {
        //         age: 'ASC'
        //     }
        // });
        // console.log(users);


        // 通过 findOneBy 也可以
        // const user = await AppDataSource.manager.findOneBy(User, {
        //     age: 23
        // });
        // console.log(user);


        // findOne 还有两个特殊的方法
        // findOneOrFail 或者 findOneByOrFail，如果没找到，会抛一个 EntityNotFoundError 的异常
        // try {
        //     const user = await AppDataSource.manager.findOneOrFail(User, {
        //         where: {
        //             id: 666
        //         }
        //     });
        //     console.log(user);
        // }
        // catch(e) {
        //     console.log(e);
        //     console.log('没找到该用户');
        // }


        // 用 query 方法直接执行 sql 语句
        // const users = await AppDataSource.manager.query('select * from user where age in(?, ?)', [21, 22]);
        // console.log(users);


        // 但复杂 sql 语句不会直接写，而是会用 query builder
        // const queryBuilder = await AppDataSource.manager.createQueryBuilder();
        // const user = await queryBuilder.select("user")
        //     .from(User, "user")
        //     .where("user.age = :age", { age: 21 })
        //     .getOne();
        // console.log(user);


        // 多条有关联的数据的增删改都离不开事务，怎么开启事务呢？
        // 用 transaction 方法包裹下就好了
        await AppDataSource.manager.transaction(async manager => {
            await manager.save(User, {
                id: 4,
                firstName: 'eee',
                lastName: 'eee',
                age: 20
            });
        });
        
    })
    .catch(error => console.log(error))
