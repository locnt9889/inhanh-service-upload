/**
 * Created by LocNT on 1/27/2015 12:00 AM.
 */

var mysql = require('mysql');
var mysqlDao = require("../daos/MysqlDao");
var mysqlHelper = require("../daos/MysqlHelper");
var message = require('../messages/en').contentMessage;
var constant = require('../public/constant');
var mysqlResponseModel = require('../models/mysqlResponseModel');

var accessTokenModel = require('../models/accessTokenModel');
var TableName = "access_token";
var fieldNameId = "id";

exports.insertAccessToken = function(userId, device_token, access_token){
    console.log(" +++ " + "DAO insert access token ");
    var connection = mysql.createConnection(constant.mysqlInfo);

    var sql_remove_access = constant.sql_script_home.sql_remove_all_token_access_by_user_and_device;
    var sql_insert = constant.sql_script.sql_insert.replace('#table', TableName);

    var newAccessTokenModel = new accessTokenModel.AccessToken();
    newAccessTokenModel.user_id = userId;
    newAccessTokenModel.device_token = device_token;
    newAccessTokenModel.access_token = access_token;
    newAccessTokenModel.login_time = new Date();

    var sql_insert_param = newAccessTokenModel;
    var sql_remove_access_param = [userId, device_token];
    connection.connect(function(err,connect){
        if(err){
            console.log(" +++ insertAccessToken connect error - " + err);
        }else{
            console.log(" +++ insertAccessToken connect success");
            connection.query(sql_remove_access, sql_remove_access_param, function(err, rows, fields) {
                if (err) {
                    console.log(" +++ remove all access error - " + err);
                }else {
                    console.log(" +++ remove all access success - " + JSON.stringify({results : rows}));
                    connection.query(sql_insert, sql_insert_param, function(err, rows, fields) {
                        if (err) {
                            console.log(" +++ insert new access error - " + err);
                        }else {
                            console.log(" +++ insert new access success - " + JSON.stringify({results : rows}));
                        }
                    });
                    connection.end();
                }
            });
        }
    });
}

exports.removeAccessToken = function(res, accessTokenObj, access_token){
    console.log(" +++ " + "DAO remove access token ");
    var connection = mysql.createConnection(constant.mysqlInfo);

    var sql_remove_access = constant.sql_script_home.sql_remove_access_token_logout;
    var sql_remove_access_param = [new Date(), access_token];

    var actionName = message.functionName.logout;
    var responseModel = new mysqlResponseModel.MysqlResponse();
    connection.connect(function(err,connect){
        if(err){
            console.log(" +++ removeAccessToken connect error - " + err);
            mysqlHelper.errorConnection(res, err, connection);
        }else{
            console.log(" +++ removeAccessToken connect success");
            connection.query(sql_remove_access, sql_remove_access_param, function(err, rows, fields) {
                if (err) {
                    console.log(" +++ remove access error - " + err);
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
                    console.log(" +++ remove access success - " + JSON.stringify({results : rows}));
                    responseModel.results = rows;
                    responseModel.statusErrorCode = constant.error_code.success;
                    res.send(responseModel);
                }
            });
            connection.end();
        }
    });
}

exports.checkAccessToken = function(access_token, res, callback, paramCallback){
    console.log(" +++ " + "DAO check access token ");
    var connection = mysql.createConnection(constant.mysqlInfo);

    var sql_check_access = constant.sql_script_home.sql_check_access_token;
    var sql_check_access_param = [access_token];

    var actionName = message.functionName.check_access_token;
    var responseModel = new mysqlResponseModel.MysqlResponse();
    connection.connect(function(err,connect){
        if(err){
            console.log(" +++ checkAccessToken connect error - " + err);
            mysqlHelper.errorConnection(res, err, connection);
        }else{
            console.log(" +++ checkAccessToken connect success");
            connection.query(sql_check_access, sql_check_access_param, function(err, rows, fields) {
                if (err) {
                    console.log(" +++ check access error - " + err);
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
                }else if(rows.length == 0){
                    console.log(" +++ check access error - " + err);
                    responseModel.errorsObject = {};
                    responseModel.errorsMessage = message.error_access_token;
                    responseModel.results = {};
                    responseModel.statusErrorCode = constant.error_code.error_check_access_token;
                    res.send(responseModel);
                }else {
                    console.log(" +++ check access success - " + JSON.stringify({results : rows}));
                    var accessTokenObj = rows[0];
                    callback(res, accessTokenObj, paramCallback);
                }
            });
            connection.end();
        }
    });
}

