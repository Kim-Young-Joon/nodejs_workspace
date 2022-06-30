let mongoose = require("mongoose");
let promise = mongoose.connect('mongodb://127.0.0.1/mydb');
let db = mongoose.connection;

// MongoDB에서 오류가 있다면 오류를 콘솔로 바인딩하라
db.once('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log("연결 성공");
    // doRead();
    doView("장길산");
});

function doRead() {
    db.collection("person").find({}).toArray ((err, result) => {
        if(err) throw err;
        console.log(result);
    });
}

function doView(name) {
    console.log("찾기");
    db.collection("person").findOne({name: name}, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
}