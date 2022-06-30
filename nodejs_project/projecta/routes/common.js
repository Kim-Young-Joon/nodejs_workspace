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

async function executeDB(sql, params) {
    let promise = new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            conn.query(sql, params, (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows);
                conn.release();
            });
        });
    });

    await promise; // promise 가 끝나기를 기다리다가
    return promise; // 종료하면 promise를 반환
}

// 외부로 pool 객체를 노출시킴
exports.pool = pool;
exports.executeDB = executeDB;