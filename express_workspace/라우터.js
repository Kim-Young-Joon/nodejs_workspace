let express = require('express');

let app = express();
app.use(express.urlencoded({extended:true}));
// 초창기에는 body-parser 모듈 설치 후 사용했는데 현재는 express가 모두 처리한다

// 특정 url : 어떤 action이 짝이 될 것인가 - 라우터
/*
    클라이언트로부터 정보를 보낼 때
    get : 127.0.0.1:4000/a?x=4&y=7          request.query["키"]
    새로운 get 방식 : 127.0.0.1:4000/a/4/7  request.params["키"]
    post : 미들웨어를 하나 연결한다.
    app.use(express.urlencoded({extended:true}))    request.body["키"]
*/

app.get("/a", (req, res, next) => {
    res.send("a입니다."); // writeHead + write + end
    // 들어오는 데이터에 맞춰서 적절히 데이터를 전송한다.
});

app.get("/b", (req, res, next) => {
    res.send("b입니다.");
});

app.get("/board/list", (req, res, next) => {
    res.send("b입니다.");
});

// 새로운 방식으로 값을 받아보자
app.get("/a/:x", (req, res, next) => {
    let x = req.params.x;
    res.send("받은 값은 " + x + " 입니다.");
});

app.get("/a/:x/:y", (req, res, next) => {
    let x = req.params.x;
    let y = req.params.y;
    res.send(`받은 값은 ${x}와 ${y} 입니다.`);
});

app.get("/add/:x/:y", (req, res, next) => {
    let x = paseInt(req.params.x);
    let y = parseInt(req.params.y);
    res.send(`${x} + ${y} = ${x+y}`);
});

// http://127.0.0.1:4000/person?name=Tom&age=11&phone=010-0000-0000
app.get("/person", (req, res) => {
    let name = req.query.name;
    let age = req.query.age;
    let phone = req.query.phone;
    let result = "";
    result += `<h1>name : ${name}</h1><br>`;
    result += `<h1>age : ${age}</h1><br>`;
    result += `<h1>phone : ${phone}</h1><br>`;

    res.send(result);
})

// http://127.0.0.1:4000/person/Tom/11/010-0000-0001
app.get("/person/:name/:age/:phone", (req, res) => {
    let name = req.params.name;
    let age = req.params.age;
    let phone = req.params.phone;
    let result = "";
    result += `<h1>name : ${name}</h1><br>`;
    result += `<h1>age : ${age}</h1><br>`;
    result += `<h1>phone : ${phone}</h1><br>`;

    res.send(result);
})

// postman 이용해서 post 방식으로 http://127.0.0.1:4000/person
// body -> x-www-form-urlencoded 선택해서 키-값 전송
app.post("/person", (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    let phone = req.body.phone;
    let result = "";

    result += `<h1>name : ${name}</h1><br>`;
    result += `<h1>age : ${age}</h1><br>`;
    result += `<h1>phone : ${phone}</h1><br>`;

    res.send(result);
})

app.use((request, response) => {
    response.status(404).send("<h1>Error</h1>");
});

app.listen(4000, () => {
    console.log("server start at http://127.0.0.1:4000");
});