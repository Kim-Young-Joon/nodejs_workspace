let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let pool = mysql.createPool({
    connectionLimit:10,
    host:"127.0.0.1",
    user:"root",
    password:"1234",
    database:"mydb",
    port:3306
});

router.get('/', function(req, res, next) {
    res.render('./board/board_list');
});

module.exports = router;