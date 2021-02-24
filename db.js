const mysql = require("mysql");

const dbUri =
  "mysql://b3295638288751:13ce3ca3@us-cdbr-east-03.cleardb.com/heroku_69ca7a7b17803d1?reconnect=true";
const connection = mysql.createPool(dbUri);

module.exports = connection;
