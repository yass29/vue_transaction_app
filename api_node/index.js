var express = require('express');
var app = express();
var sql = require("mysql");
const cors = require('cors');

var bodyParser = require('body-parser');
var port = process.env.port || 1337;
app.use(cors());
app.use(bodyParser.json());
// var conn = require("/connection/connect")();
var conn = new sql.createConnection({
  user: 'root',
  password: '',
  host: 'localhost',
  database: 'transaction_app',
  port: '3306',
  timezone: 'ist'
});

const corsOptions = {
  origin: [" http://localhost:8080"," http://localhost:3000"]
};
const requestEndpoint = "http://localhost:1337";

// var TransactionController = require('./Controller/TransactionController')();

//GET DATA
app.get('/transaction', cors(corsOptions), function (req, res) {
  //res.json({"Message":"Welcome tojks Node js"});
  req.header('User-Agent')

  conn.query("SELECT * FROM transcation Order By id DESC", function (err, data) {
    if (err) throw err;
    res.json(data);
  });
});

const getData = ()=>{
 return new Promise((resolve , reject)=>{ 
   conn.query("SELECT * FROM transcation Order By id DESC", function (err, data) {
    if (err) reject(err) ;
    resolve(data);
  });
})
}


const getBalance = () => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT balance FROM transcation ORDER  BY created_at DESC LIMIT  1", function (err, datas) {
      if (err) reject(err);
      var tempBalance = (datas ? datas[0].balance : 0);
      
      resolve(tempBalance);
    });
  })

}

const remaining = async () => {
  var tempBalance = await getBalance();
  return tempBalance;
}

//ADD DATA
app.post("/add", cors(corsOptions), async function (request, response) {
  var balance = await remaining();

  let userDetails = request.body.data;
  //if(balance){
  var mysql = 'INSERT INTO transcation SET ? ';

  userDetails.type == 'Credit' ? balance+=parseInt(userDetails.amount) : balance-=parseInt(userDetails.amount);
  userDetails.balance = balance;

  conn.query(mysql, userDetails, function (err, data) {
    if (err) throw err;

  });
  var data = await getData();
  response.json(data);
  //}

});
var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
app.use(bodyParser.json());
// app.use("/transaction" ,cors(corsOptions),  TransactionController);

app.listen(port, function () {
  var datetime = new Date();
  var message = "Server running on Port:- " + port + "Started at :- " + datetime;
  console.log(message);
});