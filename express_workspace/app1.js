let express = require('express');

let app = express(); // http 모듈에서 http.createServer()와 같은 기능 (서버 생성)

// get 방식 
app.get("/test", (request, response) => {
    response.writeHead(200, {"Content-Type":"text/html"});
    response.end(`<h1>GET Express</h1>`);
});

// post 방식
app.post("/test", (request, response) => {
    response.writeHead(200, {"Content-Type":"text/html"});
    response.end(`<h1>POST Express</h1>`);
});

app.get("/data", (request, response) => {
    response.send({name:"홍길동", age:12, phone:"010-0000-0000"});
});

app.get("/msg", (request, response) => {
    response.send("<h1>안녕하세요 express 입니다.</h1>");
});

// 이벤트 리스너
app.use((request, response) => {
    response.status(404).send("<h1>Error</h1>");
});

// 4000번 포트를 이용하여 서버 실행
app.listen(4000, () => {
    console.log("server start at http://127.0.0.1:4000");
});