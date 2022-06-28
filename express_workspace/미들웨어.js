let express = require('express');

let app = express();
// 본래의 callback 함수에는 세번째 인자로 next를 둔다
// next를 호출하면 현재의 함수로부터 그 다음 위치에 있는 함수를 자동으로 호출한다
// next를 호출하지 않으면 해당 함수에서 작동을 멈춘다.

app.use((request, response, next) => {
    console.log("첫번째 미들웨어");
    next();
});

app.use((request, response, next) => {
    console.log("두번째 미들웨어");
    next();
});

app.use((request, response, next) => {
    console.log("세번째 미들웨어");
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end('<h1>Express Middleware</h1>');
});

app.listen(4000, () => {
    console.log("server start at http://127.0.0.1:4000");
});