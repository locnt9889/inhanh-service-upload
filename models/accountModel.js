/**
 * Created by locnt9889 on 12/25/2014.
 */

/*function Account(){
    id = 0;
    this.username =this. "";
    this.password = "";
    this.email = "";
    this.phone = "";
    this.birthday = "";
    this.idcard = "";
    this.idcard_date = "";
    this.idcard_address = "";
    this.type = "SHIPPER";
    this.address = "";
    this.city_code = "";
    this.group = "";
    this.isreview = 0;
    this.created_time = new Date();
    this.modified_time = new Date();
    this.isactive = 1
}*/

function Account(){
  this.id = 0;
  this.username = "";
  this.password = "";
  this.email = "";
  this.type = "";
  this.group_id = "";
  this.group_mode = "";
  this.firstname = "";
  this.lastname = "";
  this.phone = "";
  this.birthday = new Date();
  this.idcard = "";
  this.idcard_date = new Date();
  this.idcard_address = "";
  this.title = "";
  this.desc = "";
  this.address = "";
  this.city_id = "";
  this.created_time = new Date();
  this.modified_time = new Date();
  this.isreview = 0;
  this.isactive = 1;
  this.isupdate = 0;
  this.is_map_default = 1;
  this.latitude = 0;
  this.longitude = 0;
  this.avatar_url = "";
}

exports.Account = Account;
