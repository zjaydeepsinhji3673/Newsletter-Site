const express = require('express');
var router = express.Router();
const common = require('../../../config/common');
const admin_model = require('./admin_model');

router.post('/login', function (req, res) {
    admin_model.login(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.get('/logout', function (req, res) {
    admin_model.logout(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.get('/get_all_data', function (req, res) {
    admin_model.get_all_data(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.put('/update_news', function (req, res) {
    admin_model.update_news(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})

router.get('/all_count', function (req, res) {
    admin_model.all_count(req, function (code, message, data) {
        common.send_response(req, res, code, message, data);
    })
})
module.exports = router;