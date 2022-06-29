// DB 관련 정보를 모듈화

let mysql = require('mysql');
let pool = mysql.createPool({
    connectionLimit:10,
    host:"localhost", // DB ip
    user:"root",
    password:"1234",
    database:"mydb",
    port:3306
});

// 외부로 pool 객체를 노출시킴
exports.pool = pool;