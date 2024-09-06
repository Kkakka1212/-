const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));  // Static files (CSS, JS, Images)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // 이미지 저장 폴더
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // 파일명 설정
    }
});
const upload = multer({ storage: storage });

let posts = [];  // 게시글 데이터 저장 (예시)

app.post('/submit-post', upload.array('files', 10), (req, res) => {
    const { title, content, tags } = req.body;
    const files = req.files.map(file => file.filename);  // 업로드된 파일 목록
    const newPost = { title, content, tags: tags.split(','), files };

    posts.push(newPost);  // 게시글 저장
    res.redirect('/');  // 게시글 작성 후 리다이렉션
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');  // 기본 페이지 제공
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
