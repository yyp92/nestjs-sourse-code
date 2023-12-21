/**
 * api 也都有 promise 版本
 */

const mysql = require('mysql2/promise');

(async function() {

    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123456',
        database: 'practice'
    });

    const [results, fields] = await connection.query('SELECT * FROM customers');

    console.log(results, 'results');
    console.log(fields.map(item => item.name), 'fields'); 
})();
