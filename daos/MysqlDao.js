/**
 * File mysql Dao generic : support CRUD
 * Created by locnt9889 on 12/25/2014.
 */
var mysql = require('mysql');

var constant = require('../public/constant');
var message = require('../messages/en').contentMessage;
var mysqlHelper = require('./MysqlHelper');

var mysqlResponseModel = require('../models/mysqlResponseModel');

/*
 * @ name : addNew
 * @ description : add new a row to DB using mysql
 * @ authen : locnt
 * @ param : res - response to client
 * @ param : tableName - table name
 * @ param : modelObject - object data attribute === field of table
 */
exports.addNew = function(res, tableName, modelObject){
    console.log(" +++ " + "DAO add new : " + tableName);
    var connection = mysql.createConnection(constant.mysqlInfo);
    var sql_insert = constant.sql_script.sql_insert.replace('#table', tableName);
    var sql_param = modelObject;

    connection.connect(function(err,connect){
        if(err){
            console.log(" +++ addNew connect error - " + err)
            mysqlHelper.errorConnection(res, err,connection);
        }else{
            console.log(" +++ addNew connect success");
            mysqlHelper.query(res, message.functionName.addNew, connection, sql_insert, sql_param);
        }
    });
}

/*
 * @ name : findAll
 * @ description : find all with isactive == 1
 * @ authen : locnt
 * @ param : res - response to client
 * @ param : tableName - table name
 */
exports.findAll = function(res, tableName){
    console.log(" +++ " + "DAO findAll : " + tableName);
    var connection = mysql.createConnection(constant.mysqlInfo);
    var sql_findall = constant.sql_script.sql_findAll_isactive.replace('#table', tableName);
    var sql_param = [];
    connection.connect(function(err,connect){
        if(err){
            console.log(" +++ findAll connect error - " + err);
            mysqlHelper.errorConnection(res, err, connection);
        }else{
            console.log(" +++ findAll connect success");
            mysqlHelper.query(res, message.functionName.findAll, connection, sql_findall, sql_param);
        }
    });
}

/*
 * @ name : findById
 * @ description : find object by id with isactive == 1
 * @ authen : locnt
 * @ param : res - response to client
 * @ param : tableName - table name
 * @ param : id - id of object
 */
exports.findById = function(res, tableName, fieldNameId, id){
    console.log(" +++ " + "DAO find by id "+ id +" : " + tableName);
    var connection = mysql.createConnection(constant.mysqlInfo);
    var sql_findbyid = constant.sql_script.sql_findById_isactive.replace('#table', tableName).replace("#id",fieldNameId);
    var sql_param = [id];
    connection.connect(function(err,connect){
        if(err){
            console.log(" +++ find by id connect error - " + err);
            mysqlHelper.errorConnection(res, err, connection);
        }else{
            console.log(" +++ find by id connect success");
            mysqlHelper.query(res, message.functionName.findById, connection, sql_findbyid, sql_param);
        }
    });
}

/*
 * @ name : removeById
 * @ description : change isactive = 0
 * @ authen : locnt
 * @ param : res - response to client
 * @ param : tableName - table name
 * @ param : id - id of object
 */
exports.removeById = function(res, tableName, fieldNameId, id){
    console.log(" +++ " + "DAO remove by id "+ id +" : " + tableName);
    var connection = mysql.createConnection(constant.mysqlInfo);
    var sql_removebyid = constant.sql_script.sql_removeById.replace('#table', tableName).replace("#id",fieldNameId);
    var sql_param = [id];
    connection.connect(function(err,connect){
        if(err){
            console.log(" +++ remove by id connect error - " + err);
            mysqlHelper.errorConnection(res, err, connection);
        }else{
            console.log(" +++ remove by id connect success");
            mysqlHelper.query(res, message.functionName.findById, connection, sql_removebyid, sql_param);
        }
    });
}

/*
 * @ name : updateById
 * @ description : change isactive = 0
 * @ authen : locnt
 * @ param : res - response to client
 * @ param : tableName - table name
 * @ param : updatePerson - object have attribute changed
 * @ param : id - id of object
 */
exports.updateById = function(res, tableName, fieldNameId, updatePerson, updateId){
    console.log(" +++ " + "DAO update by id "+ updateId +" : " + tableName);
    var connection = mysql.createConnection(constant.mysqlInfo);
    var sql_updateById = constant.sql_script.sql_updateById.replace('#table', tableName).replace("#id",fieldNameId);
    var sql_param = [updatePerson , updateId];
    connection.connect(function(err,connect){
        if(err){
            console.log(" +++ update by id connect error - " + err);
            mysqlHelper.errorConnection(res, err, connection);
        }else{
            console.log(" +++ update by id connect success");
            mysqlHelper.query(res, message.functionName.updateById, connection, sql_updateById, sql_param);
        }
    });
}

