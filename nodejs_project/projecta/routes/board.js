let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let common = require('./common');

router.get('/', function(req, res, next) {
    common.pool.getConnection((err, conn) => {
        sql = `select a.id, a.writer, a.title, a.contents, date_format(a.wdate, '%Y-%m-%d') as wdate, a.hit from board a`;
        conn.query(sql, (err, rows) => {
            if(err) {
                console.log(err);
            }
            res.render('./board/board_list', {boardList: rows});
            conn.release();
        });
    });
});

router.get('/write', function(req, res) {
    res.render('./board/board_write');
});

router.post('/save', function(req, res) {
    let title = req.body.title;
    let writer = req.body.writer;
    let contents = req.body.contents;

    common.pool.getConnection((err, conn) => {
        sql = `insert into board(title, writer, contents, wdate, hit)
            values('${title}', '${writer}', '${contents}', now(), 0)`;
        conn.query(sql, (err, rows) => {
            if(err) {
                console.log(err);
            }
            conn.release();
        });
    });

    res.redirect('/board');
});

router.get('/view/:id', function(req, res) {
    let id = req.params.id;
    common.pool.getConnection((err, conn) => {
        sql = `select a.id, a.writer, a.title, a.contents, date_format(a.wdate, '%Y-%m-%d') as wdate, a.hit
            from board a
            where id = ${id}`;
        conn.query(sql, (err, row) => {
            if(err) {
                console.log(err);
            }
            console.log(row);
            res.render('./board/board_view', {myData: row[0]}); // 값 자체가 하나의 열만 들어오는 '배열'이기 때문에 [0] 붙여준다
            conn.release();
        });
    });
})

router.get('/delete', function(req, res) {
    res.render('./board/board_delete');
});

router.post('/delconfirm', function(req, res) {
    let id = req.body.delId;

    common.pool.getConnection((err, conn) => {
        sql = `delete from board
            where id = ${id}`;
        conn.query(sql, (err, rows) => {
            if(err) {
                console.log(err);
            }
            conn.release();
        });
    });

    res.redirect('/board');
});

module.exports = router;