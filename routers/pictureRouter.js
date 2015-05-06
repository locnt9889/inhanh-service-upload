/**
 * Created by LocNT on 1/22/2015 9:30 PM.
 * picture router
 */

var express = require('express');
var router = express.Router();

var moment = require('moment');
var constant = require('../public/constant');
var pictureService = require("../services/pictureService");

module.exports = router;

/*
 * @ name : picture/getavatar
 * @ description : register by id
 * @ authen : locnt
 * @ param : newaccount = json string
 */
router.get('/getAvatar', function(req, res) {
    console.log("@@@@@SERVICE : ----- " + moment().format(constant.formatTime) + " -----API : upload/getAvatar");
    pictureService.getAvatar(req, res);
});
