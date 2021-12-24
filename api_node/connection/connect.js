var sql = require("mysql");
var connect = function()
{
    var conn = new sql.createConnection({
        user: 'root',
        password: '',
        host : 'localhost',
        database: 'transaction_app',
        port : '3306',
    });
 
    return conn;
};

module.exports = connect;