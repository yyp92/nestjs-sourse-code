/**
 * mysql2 基本使用
 */

const mysql = require('mysql2');


// 连接数据库
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'practice'
});


// 查询全部
// connection.query(
//     'SELECT * FROM customers',
//     function(err, results, fields) {
//         console.log(results);
//         console.log(fields.map(item => item.name)); 
//     }
// );


// 查询也可以指定占位符：
// connection.query(
//     'SELECT * FROM customers WHERE name LIKE ?',
//     ['李%'],
//     function(err, results, fields) {
//         console.log(results);
//         console.log(fields.map(item => item.name)); 
//     }
// );


// 比如我们插入一条数据：
// connection.execute(
//     'INSERT INTO customers (name) VALUES (?)',
//     ['光'], (err, results, fields) => {
//     console.log(err);
// });

// 试着修改
// connection.execute(
//     'UPDATE customers SET name="guang" where name="光"',
//     (err) => {
//         console.log(err);
//     }
// );

// 再试试删除：
connection.execute(
    'DELETE  FROM customers where name=?',
    ['guang'],
    (err) => {
        console.log(err);
    }
);




