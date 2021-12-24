var express = require('express');
var router = express.Router();
var conn = require("../connection/connect")();
var routes =function(){

    router.route('/')
        .get(function (req, res){
        // conn.connect(function(err) {
        //     if (err) throw err;
            conn.query("SELECT * FROM transcation", function (err, res, req) {
              if (err) throw err;
              console.log(res);
            });
            // conn.end();
          
        });     
      router.route('/add')
        .post(function (req, res) {
            // conn.connect(function(err) {
                // if (err) return callback(err, null);
                console.log("Connected!");
                const userDetails=req;
                console.log(userDetails)
                // var mysql = 'INSERT INTO transcation SET ? ';
                // conn.query(mysql, userDetails,function (err, data) { 
                //     if (err) throw err;
                //        console.log("User dat is inserted successfully "); 
                // });
            //   });
            });
        return router;
    };
    module.exports = routes;