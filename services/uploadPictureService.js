/**
 * Created by locnt9889 on 12/25/2014.
 */
var uploadPictureDao = require("../daos/uploadPictureDao");
var accessTokenDao = require("../daos/accessTokenDao");
var accountModel = require("../models/accountModel");

exports.uploadAvatar = function(req, res){
    var accessToken = req.body.access_token;
    var avatarData = req.body.avatarData ? req.body.avatarData : "";

    accessTokenDao.checkAccessToken(accessToken, res, uploadPictureDao.uploadAvatar, avatarData);
}