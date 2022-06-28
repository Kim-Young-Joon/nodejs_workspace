let express = require('express');

let app = express(); // http 모듈에서 http.createServer()와 같은 기능 (서버 생성)

// get 방식 파라미터 처리하기
app.get("/userinfo", (req, res) => {
    console.log(req.query);

    // GET 방식만
    let name = req.query.name; 
    let age = req.query.age;

    res.send(`<h1>${name} ${age}</h1>`);
})

app.get("/array", (req, res) => {
    console.log(req.query);

    let arr = req.query.arr;
    let result = "";

    for(i in arr) {
        result += `${arr[i]}<br>`;
    }

    res.send(result);
})

app.use((request, response) => {
    response.status(404).send("<h1>Error</h1>");
});

app.listen(4000, () => {
    console.log("server start at http://127.0.0.1:4000");
});