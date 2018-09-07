let express = require('express');
let router = express.Router();
let db_api = require('../db/api');

router.get('/todolist', (req, res, next) => {
    db_api.query('select * from t_todolist', (err, rows) => {
        if (err) throw err;
        res.render('todolist', {title: 'list', lists: rows});
    })
});

router.get('/todonote', (req, res, next) => {
    db_api.query('select * from t_todonote', (err, rows) => {
        if (err) throw err;
        res.render('todonote', {title: 'note', notes: rows});
    })
});

module.exports = router;
