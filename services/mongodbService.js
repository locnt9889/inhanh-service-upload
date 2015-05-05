/**
 * Created by LocNT on 7/22/2014
 */
var MongoClient = require('mongodb').MongoClient;

/*person dto ajax*/
function MongoResponse(){
    this.errorsRes = {};
    this.db = {};
    this.statusErrorRes = 0;
};

exports.newMongoResponse = function(){
    return new MongoResponse();
}

exports.initdb = function() {

    MongoClient.connect("mongodb://adminservice:qwe123qwe@ds041190.mongolab.com:41190/IbmCloud_555lh56k_47mu49rp", function(err, dbNew) {
        var mongoResponse = new newMongoResponse();
        if(err) {
            console.log("log error : " + err);
            mongoResponse.errorsRes = err;
            mongoResponse.statusErrorRes = 1;
        }else{
            console.log("log connection");
            mongoResponse.db = dbNew;
            mongoResponse.statusErrorRes = 0;
        }

        res.send(mongoResponse);
    });
};