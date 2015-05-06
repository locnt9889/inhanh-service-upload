/**
 * Created by locnt9889 on 12/25/2014.
 */

var constant = require('../public/constant');
var path = require("path");

exports.getAvatar = function(req, res){
    var id = req.query.id ? req.query.id : 0;
    var avatarFileName = constant.file_avatar_name_pre + id + constant.file_avatar_ext;
    var fullFile = constant.path_upload_file + constant.folder_upload_file_avatar + avatarFileName;

    require("fs").exists(fullFile, function(result){
        if(result){
            res.sendfile(path.resolve(fullFile));
        }else{
            res.sendfile(path.resolve(constant.file_avatar_default));
        }
    });
}