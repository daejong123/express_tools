var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  let image_dir = path.join(__dirname, '../uploads');
  var imageNames = [];  
  fs.readdir(image_dir, (err, files) => {
      imageNames = files;
      console.log(files);
      res.render('index', { title: 'MFE-Tools', imageNames, name: 'dottie'});
  })
}); 

// 下载文件， restful风格
router.get('/download/:name', function(req, res){
  let param = req.params.name;
  let file = path.join(__dirname, '../uploads/', param);
  if (fs.existsSync(file)) {
    res.download(file); 
  } else {
    res.send('错误：没有该文件: ' + param);
  }
});

// 下载文件
router.get('/search', function(req, res) {
  if (req.query.hasOwnProperty('name')) {
    let name = req.query.name;
    let file = path.join(__dirname, '../uploads/', name);
    if (fs.existsSync(file)) {  
      res.download(file); 
    } else {
      res.send('错误：没有该文件: ' + name);
    }
  } else {
    res.send('错误：参数中缺少name字段。')
  }
});

module.exports = router;
