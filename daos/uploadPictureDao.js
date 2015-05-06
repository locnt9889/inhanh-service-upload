/**
 * Created by locnt9889 on 12/25/2014.
 */

var mysql = require('mysql');
var mysqlDao = require("../daos/MysqlDao");
var mysqlHelper = require("../daos/MysqlHelper");
var mysqlResponseModel = require('../models/mysqlResponseModel');
var message = require('../messages/en').contentMessage;
var constant = require('../public/constant');
var commonService = require('../services/commonService');
var accessTokenDao = require('./accessTokenDao');
var TableNameAccount = constant.table_name.account;

/*
 * @ name : upload/uploadAvatar
 * @ description : remove contact
 * @ authen : locnt
 * @ param : access_token : access_token
 * @ param : array_contact_id : array contact id
 */
exports.uploadAvatar = function(res, accessTokenObj, avatarData){
    var connection = mysql.createConnection(constant.mysqlInfo);
    console.log(" +++ " + "DAO uploadAvatar : ");

    var responseModel = new mysqlResponseModel.MysqlResponse();
    if(avatarData.length == 0) {
        console.log(" +++ query error - " + err);
        responseModel.errorsObject = {};
        responseModel.errorsMessage = message.error_avatar_data_empty;
        responseModel.results = {};
        responseModel.statusErrorCode = constant.error_code.error_avatar_data_empty;
        res.send(responseModel);
    }else{
        var base64Data = avatarData.replace(/^data:image\/png;base64,/, "");
        var fileName = constant.file_avatar_name_pre + accessTokenObj.user_id + constant.file_avatar_ext;
        var fullPathFile = constant.path_upload_file + constant.folder_upload_file_avatar + fileName;
        require("fs").writeFile(fullPathFile, base64Data, 'base64', function(err) {
            if(err){
                responseModel.errorsObject = err;
                responseModel.errorsMessage = message.error_avatar_upload_failure;
                responseModel.results = {};
                responseModel.statusErrorCode = constant.error_code.error_avatar_upload_failure;
                res.send(responseModel);
            }else{
                var sql_update_avatar = constant.sql_script_upload.sql_update_avatar;
                var sql_param_update_avatar = [true, accessTokenObj.user_id];

                var actionName = message.functionName.updateAvatar;

                connection.connect(function(err,connect){
                    if(err){
                        console.log(" +++ update avatar connect error - " + err);
                        mysqlHelper.errorConnection(res, err, connection);
                    }else{
                        console.log(" +++ update avatar connect success");
                        connection.query(sql_update_avatar, sql_param_update_avatar, function(err, rows, fields) {
                            if (err) {
                                console.log(" +++ query error - " + err);
                                responseModel.errorsObject = {
                                    code : err.code,
                                    errno : err.errno,
                                    message : err.message,
                                    sqlState : err.sqlState
                                };
                                responseModel.errorsMessage = message.errorQuery.replace('#1',actionName);
                                responseModel.results = {};
                                responseModel.statusErrorCode = constant.error_code.error_system_query;
                                res.send(responseModel);
                            }else {
                                console.log(" +++ query is successfully - ");
                                responseModel.errorsObject = {};
                                responseModel.errorsMessage = "";
                                responseModel.results = rows;
                                responseModel.statusErrorCode = constant.error_code.success;
                                res.send(responseModel);
                            }
                        });
                        connection.end();
                    }
                });
            }
        });
    }
}