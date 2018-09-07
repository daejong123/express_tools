require('dotenv').config();
let mysql = require('mysql');
let pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

function query(sql, callback) {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(sql, (err, rows) => {
            callback(err, rows);
            connection.release(); //释放连接
        });
    })
}

// test
// query('select * from t_todolist', (err, rows) => {
//     if (err) throw err;
//     // console.log(rows);
//     console.log(rows[0]);
// });

exports.query = query;

// var post  = {id: 1, title: 'Hello MySQL'};
// var query = connection.query('INSERT INTO posts SET ?', post, function (error, results, fields) {
//   if (error) throw error;
//   // Neat!
// });
// console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'