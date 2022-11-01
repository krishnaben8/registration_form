var mysql = require('mysql');
var connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : '',
  insecureAuth : true
});
 
 
connection.query('SELECT "connected to MySql Database" AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log(results[0].solution);
});


module.exports = connection;