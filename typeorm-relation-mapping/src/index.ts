/**
 *  一对多的映射和关联 CRUD
 */

import { AppDataSource } from "./data-source"
import { Article } from './entity/Article';
import { Tag } from './entity/Tag';

AppDataSource.initialize().then(async () => {
    const a1 = new Article();
    a1.title = 'aaaa';
    a1.content = 'aaaaaaaaaa';

    const a2 = new Article();
    a2.title = 'bbbbbb';
    a2.content = 'bbbbbbbbbb';

    const t1 = new Tag();
    t1.name = 'ttt1111';

    const t2 = new Tag();
    t2.name = 'ttt2222';

    const t3 = new Tag();
    t3.name = 'ttt33333';

    a1.tags = [t1,t2];
    a2.tags = [t1,t2,t3];

    const entityManager = AppDataSource.manager;

    // await entityManager.save(t1);
    // await entityManager.save(t2);
    // await entityManager.save(t3);

    // await entityManager.save(a1);
    // await entityManager.save(a2);



    // 同样是通过 relations 指定关联查询：
    // const article = await entityManager.find(Article, {
    //     relations: {
    //         tags: true
    //     }
    // });
    // console.log(article);
    // console.log(article.map(item=> item.tags))



    // 也可以手动用 query builder 来 join 查询：
    // const article = await entityManager
    //     .createQueryBuilder(Article, "a")
    //     .leftJoinAndSelect("a.tags", "t")
    //     .getMany()   
    // console.log(article);
    // console.log(article.map(item=> item.tags))



    // 或者先拿到 Article 的 Repository 再创建 query builder 来查询也行：
    // const article = await entityManager
    //     .getRepository(Article)
    //     .createQueryBuilder( "a")
    //     .leftJoinAndSelect("a.tags", "t")
    //     .getMany()
    // console.log(article);
    // console.log(article.map(item=> item.tags))



    /**
     * 那如果文章多加了一些标签或者删除了一些标签，怎么修改呢
     * 比如我把 id 为 2 的文章的标签只保留包含 111 的，并且还改了标题：
     */
    // const article = await entityManager.findOne(Article, {
    //     where: {
    //         id: 2
    //     },
    //     relations: {
    //         tags: true
    //     }
    // });
    // article.title = "ccccc";
    // article.tags = article.tags.filter(item => item.name.includes('ttt111'));
    // await entityManager.save(article);
    


    // 至于删除就简单了，因为中间表的外键设置了 CASCADE 的级联删除，这样只要你删除了 article 或者 tag，它都会跟着删除关联记录。
    // await entityManager.delete(Article, 1);
    // await entityManager.delete(Tag, 1);



    // 然后我们通过 tag 来关联查询下：
    const tags = await entityManager.find(Tag, {
        relations: {
            articles: true
        }
    });
    
    console.log(tags);

    
}).catch(error => console.log(error))
