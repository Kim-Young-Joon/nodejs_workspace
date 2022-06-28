let express = require('express');

let app = express();
app.use(express.urlencoded({extended:true}));

// 외부 모듈을 불러온다.
let board = require("./Router/board");

app.use('/board', board); // http:127.0.0.1:4000/board

app.use((request, response) => {
    response.status(404).send("<h1>Error</h1>");
});

app.listen(4000, () => {
    console.log("server start at http://127.0.0.1:4000");
});