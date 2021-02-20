import mysql from 'mysql';

const connection = mysql.createConnection({
  host: "localhost",
  user: "noteuser",
  password: "password",
  database: "noteapp",
});

connection.connect((error) => {
  if (error) throw Error();
  console.log("connected to database");
});

export default connection;