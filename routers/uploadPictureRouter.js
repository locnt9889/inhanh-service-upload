/**
 * Created by LocNT on 1/22/2015 9:30 PM.
 * Home router for account: login,register,...
 */

var express = require('express');
var router = express.Router();

var uploadPictureService = require("../services/uploadPictureService");
var moment = require('moment');
var constant = require('../public/constant');

module.exports = router;

/*
 * @ name : upload/uploadavatar
 * @ description : register by id
 * @ authen : locnt
 * @ param : newaccount = json string
 */
router.post('/uploadAvatar', function(req, res) {
    console.log("@@@@@SERVICE : ----- " + moment().format(constant.formatTime) + " -----API : upload/uploadAvatar");
    uploadPictureService.uploadAvatar(req, res);
});
