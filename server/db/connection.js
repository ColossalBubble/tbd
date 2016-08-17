const mysql = require('mysql');

const users = require('./models').users;

 var connection= mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'tbd'
});


connection.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});


module.exports.connection = connection;
module.exports.users = users;