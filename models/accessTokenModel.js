/**
 * Created by LocNT on 1/26/2015 11:53 PM.
 */


function AccessToken(){
    this.id = 0;
    this.user_id = "";
    this.device_token = "";
    this.access_token = "";
    this.login_time = "";
    this.logout_time = "";
    this.islogin = 1;
    this.isactive = 1
}

exports.AccessToken = AccessToken;