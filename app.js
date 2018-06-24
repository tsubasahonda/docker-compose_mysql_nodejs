const mysql = require('mysql');

const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'node_test'
});

// 接続
con.connect((err) => {
  if (err) throw err;

  console.log('connected to mysql');
});


let data = {
  value: Math.random()
};

// insert
con.query('insert into scores set ?', data, (err, res)  => {
  if (err) throw err;
  console.log(data.value);
});

// 切断
con.end((err) => {
  if (err) throw err;

  console.log('disconnected to mysql');
});