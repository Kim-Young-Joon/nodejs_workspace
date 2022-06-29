// MySQL, 프라미스 기반의 MySQL (콜백을 벗어나기 위해서)
// MySQL은 트랜잭션 처리할 때, 콜백의 지옥에 빠진다.
// npm install mysql

let mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',   // DB ip
    user:'root',
    password:'1234',
    database: 'mydb',
    port:3306
});

// 데이터 추가하기
// let title = "제목6";
// let writer = "작성자6";
// let contents = "내용6";
// sql = `insert into board(title, writer, contents, wdate, hit)
//     values('${title}', '${writer}', '${contents}', now(), 0)`;

// pool.getConnection((err, connection) => {
//     connection.query(sql, (err, rows) => {
//         if(err) {
//             console.log(err);
//         }
//         connection.release();
//     });
// });

sql = "insert into board(title, writer, contents, wdate, hit) "
sql += " values ( ?, ?, ?, now(), 0)";

params = ["새로운 제목", "작성자", "새로운 내용"];

pool.getConnection((err, connection) => {
    connection.query(sql, params, (err, rows) => {
        if(err) {
            console.log(err);
        }
        console.log(sql);
        connection.release();
    });
});

pool.getConnection((err, connection) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log("연결성공");

    sql = `select a.id, a.writer, a.title,
    a.contents, date_format(a.wdate, '%Y-%M-%d') as wdate
    from board a`;
    connection.query(sql, (err, rows) => {
        // 쿼리가 실행된 결과를 가져옴
        if(err) {
            console.log(err);
            connection.release();
            return;
        }
        // rows 파라미터에 수행된 결과가 전달된다.
        for(let row of rows) {
            console.log(row);
        }

        connection.release(); // 연결 해제
    });
});

// 현재 사용하는 DB는 MariaDB - 연결 잘됨

// MySQL 8 이상부터는 아래 작업을 해줘야 한다.
// alter user 'root'@'localhost' identified with mysql_native_password by '1234';