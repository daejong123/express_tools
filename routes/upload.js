const multer = require('multer');
const express = require('express');
const fs = require('fs');

const router = express.Router();
const upload = multer({
    dest: 'uploads', // 定义图片上传的临时目录
    limits: {
        fileSize: 1024*1024*10
    }
});

router.post('/hello', function(req, res) {
    console.log(req.body);
    res.send(req.body)
})

router.post('/', upload.any(), function (req, resp) {
    // 图片会放在uploads目录并且没有后缀，需要自己转存，用到fs模块
    // 对临时文件转存，fs.rename(oldPath, newPath,callback);
    let file = req.files[0];
    let originalname = file.originalname;
    let names = Object.getOwnPropertyNames(req.body);
    if (names.indexOf('id') !== -1) {
        originalname = req.body.id + "-" + originalname;
    }
    fs.rename(file.path, "uploads/"+originalname, function(err) {
        if (err) {
            throw err;
        }
        console.log('上传成功!');
    })
    let fileInfo = {};
    // 获取文件信息
    fileInfo.mimetype = file.mimetype;
    fileInfo.originalname = originalname;
    fileInfo.size = (file.size/1024/1024).toFixed(2) + 'M';
    fileInfo.path = file.path;
    fileInfo.status = 'upload success';
    // 设置响应类型及编码
    resp.set({
        'content-type': 'application/json; charset=utf-8'
    });
    resp.redirect('/')
    resp.send(JSON.stringify(fileInfo));
    /**
    {
        "mimetype": "image/png",
        "originalname": "ide-color.png",
        "size": "0.14M",
        "path": "uploads/4e792aa8bf83a8e991a61e23a27ce590"
    }
     */
});
module.exports = router;