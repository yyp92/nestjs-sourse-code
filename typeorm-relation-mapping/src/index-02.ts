/**
 *  一对多的映射和关联 CRUD
 */

import { AppDataSource } from "./data-source"
import { Department } from './entity/Department';
import { Employee } from './entity/Employee';

AppDataSource.initialize().then(async () => {
    // const d1 = new Department()
    // d1.name = '技术部'

    const e1 = new Employee()
    e1.name = '张三'
    // e1.department = d1

    const e2 = new Employee()
    e2.name = '李四'
    // e2.department = d1

    const e3 = new Employee()
    e3.name = '王五'
    // e3.department = d1

    const d1 = new Department()
    d1.name = '技术部'
    d1.employees = []

    // await AppDataSource.manager.save(Department, d1)
    // await AppDataSource.manager.save(Employee, [e1, e2, e3])
    // await AppDataSource.manager.save(Department, d1)

    // const deps = await AppDataSource.manager.find(Department);
    // console.log(deps);  
    
    // 想要关联查询需要声明下 relations：
    // const deps = await AppDataSource.manager.find(Department, {
    //     relations: {
    //         employees: true
    //     }
    // });
    // console.log(deps);
    // console.log(deps.map(item => item.employees))

    // 这个 relations 其实就是 left join on，或者通过 query builder 来手动关联：
    // const es = await AppDataSource.manager.getRepository(Department)
    //     .createQueryBuilder('d')
    //     .leftJoinAndSelect('d.employees', 'e')
    //     .getMany();
    // console.log(es);
    // console.log(es.map(item => item.employees))

    // 也可以直接用 EntityManager 来创建 query builder：
    // const es = await AppDataSource.manager
    //     .createQueryBuilder(Department, 'd')
    //     .leftJoinAndSelect('d.employees', 'e')
    //     .getMany();

    // console.log(es);
    // console.log(es.map(item => item.employees))

    // 删除的话，需要先把关联的 employee 删了，再删除 department：
    const deps = await AppDataSource.manager.find(Department, {
        relations: {
            employees: true
        }
    });
    await AppDataSource.manager.delete(Employee, deps[0].employees);
    await AppDataSource.manager.delete(Department, deps[0].id);
    
}).catch(error => console.log(error))
