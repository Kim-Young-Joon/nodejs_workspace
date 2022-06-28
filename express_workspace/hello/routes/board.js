var express = require('express');
var router = express.Router();

let boardData = [
  {id:0, title:"제목1", writer:"작성자1", contents:"내용1", wdate:"2022-06-28"},
  {id:1, title:"제목2", writer:"작성자2", contents:"내용2", wdate:"2022-06-28"},
  {id:2, title:"제목3", writer:"작성자3", contents:"내용3", wdate:"2022-06-28"},
  {id:3, title:"제목4", writer:"작성자4", contents:"내용4", wdate:"2022-06-28"},
  {id:4, title:"제목5", writer:"작성자5", contents:"내용5", wdate:"2022-06-28"}
];

/* GET home page. */
router.get('/', function(req, res, next) {
  // ejs 파일의 경로가 views로 확정, 확장자 ejs로 확정
  res.render('list', { title: '게시판' });
  res.redirect("/board/list");
});

// restful api 서버 : 데이터를 json으로 주고 받는 서버
// 안드로이드, react, vue, angular, 폴리머 ...
// 직접 데이터베이스에 접근해서 데이터 읽고 쓰기를 하지 않는다.
// 안드로이드는 애초에 DB 클라이언트를 올려놓을 수 없고
// react나 vue는 쓰려고 한다면 사용 가능하나 nodejs 기반이기에
// MVVW 방식에서는 직접 DB 접근 불가능하게 되어있다.
// 백앤드가 대신 DB에서 데이터를 가져와 전달한다.
// 데이터만 전달하는 서버!
router.get("/list", (req, res) => {
  // res.send(boardData);
  res.render("./board/board_list.ejs", {boardList:boardData});
});

router.get("/view/:id", (req, res) => {
  let id = parseInt(req.params["id"]);
  // res.send(boardData[id]);
  res.render("./board/board_view.ejs", {boardItem:boardData[id]});
});

router.get("/write", (req, res) => {
  res.render("./board/board_write.ejs");
});

router.post("/save", (req, res) => {
  let adder = new Object();
  adder.id = boardData.length;
  adder.title = req.body.title;
  adder.writer = req.body.writer;
  adder.wdate = req.body.wdate;
  adder.contents = req.body.contents;

  boardData.push(adder);

  res.redirect("/board/list");
});

// delete 해보기~
router.post("/delete", (req, res) => {
  if(boardData > 2) {
    boardData.splice(boardData.length - 1, 1);
  }
  res.redirect("/board/list");
});

module.exports = router;  