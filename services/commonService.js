/**
 * Created by locnt9889 on 1/6/2015.
 */
var uuid = require('node-uuid');
exports.isValidObjectID = function(str){
    // A valid Object Id must be 24 hex characters
    return (/^[0-9a-fA-F]{24}$/).test(str);
}

exports.generateAccessToken = function(){
    var newUuid = uuid.v1();
    return newUuid;
}