import mysql from "mysql";

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "noteuser",
//   password: "password",
//   database: "noteapp",
// });

const connection = mysql.createConnection(
  "mysql://b3295638288751:13ce3ca3@us-cdbr-east-03.cleardb.com/heroku_69ca7a7b17803d1?reconnect=true"
);

connection.connect((error) => {
  if (error) throw Error();
  console.log("connected to database");
});

export default connection;
