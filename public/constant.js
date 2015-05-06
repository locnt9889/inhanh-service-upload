/**
 * Created by LocNT on 1/19/2015 11:16 PM.
 */

/*local db*/
/*exports.mysqlURL = "mysql://root:12345@localhost:3306/inhanh?reconnect=true&charset=UTF8_GENERAL_CI&timezone=+0700'";*/
/*exports.mysqlInfo = {
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'inhanh'
}*/

/*server db*/

//exports.mysqlURL = "mysql://devinhanh:inhanh2014@localhost:3306/inhanh?reconnect=true&charset=UTF8_GENERAL_CI&timezone=+0700'";
exports.mysqlInfo = {
    host: 'localhost',
    user: 'devinhanh',
    password: 'inhanh2014',
    database: 'inhanh'
}

/*constant*/
exports.formatTime = "YYYY-MM-DD HH:mm:ss";
exports.formatDate = "YYYY-MM-DD";

exports.account_type = {
    admin : "ADMIN",
    shipper : "SHIPPER",
    shopper : "SHOPPER"
}

exports.profileAction = {
    register : "REGISTER",
    update : "UPDATE"
}

exports.error_code = {
    success : 0,
    error_connection_db : 100,
    error_system_query : 1,

    error_check_register_email : 2,
    error_check_register_username : 3,
    error_check_login : 4,
    error_check_access_token : 5,
    error_check_oldpassword : 6,
    error_avatar_data_empty : 7,
    error_avatar_upload_failure : 8
}

exports.sql_script_home = {
    sql_remove_all_token_access_by_user_and_device : "UPDATE access_token SET isactive = 0 WHERE user_id = ? AND device_token = ?",
    sql_remove_access_token_logout : "UPDATE access_token SET islogin = 0,logout_time = ? WHERE access_token = ?",
    sql_check_access_token : "SELECT * FROM access_token WHERE access_token = ? AND islogin = 1 AND isactive = 1"
}

exports.sql_script_upload = {
    sql_update_avatar : "UPDATE account SET has_avatar = ? WHERE id = ?"
}

exports.table_name = {
    person : "person",
    account : "account",
    order_detail : "order_detail",
    user_contact : "user_contact"
};

exports.file_avatar_default = "./public/images/avatar_default.png";

exports.folder_upload_file_avatar = "inhanh-upload-folder/avatar-image/";

exports.path_upload_file = "../";

exports.file_avatar_name_pre = "userAvatar_";

exports.file_avatar_ext = ".png";