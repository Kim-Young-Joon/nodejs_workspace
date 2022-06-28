let express = require('express');

let app = express();
app.use(express.urlencoded({extended:true}));

app.use((request, response) => {
    response.status(404).send("<h1>Error</h1>");
});

app.listen(4000, () => {
    console.log("server start at http://127.0.0.1:4000");
});