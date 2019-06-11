'use strict';

var express = require('express');
var cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

// require and use "multer"...

var app = express();


app.use(fileUpload({
  createParentPath: true
}));


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});


app.post('/api/fileanalyse', async (req, res) => {
  let file = req.files.upfile;
  console.log(file)
  res.json({
    name: file.name,
    type: file.mimetype,
    size: file.size
  });
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
