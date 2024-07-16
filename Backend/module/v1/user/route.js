const express = require('express');
var router = express.Router();
const common = require('../../../config/common');
const user_model = require('./user_model');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/newslatters/');
    },
    filename: (req, file, cb) => {
        let name;
            name = Date.now() + '-newslatters-' + file.originalname;
            req.body.newslatters = name;
        cb(null, name);
    },
});
const upload = multer({
    storage: storage
})

router.post('/login', function (req, res) {
    user_model.login(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.post('/register', function (req, res) {
    user_model.register(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.get('/logout', function (req, res) {
    user_model.logout(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.post('/add_news', upload.array('image',1), function (req, res) {
    user_model.add_news(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.get('/get_data', function(req, res){
    user_model.get_data(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.get('/get_my_news', function(req, res){
    user_model.get_my_news(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.put('/delete_news', function(req, res){
    user_model.delete_news(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})
module.exports = router;