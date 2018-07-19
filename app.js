const mysql = require('mysql');
const fs = require('fs');
let rstoredata = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

console.log(rstoredata['225']['所在地']);

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'rstore'
});

let rstoredataId = new Array();
for(key in rstoredata) {
  rstoredataId.push(key);
}

con.connect((err) => {
  if (err) throw err;

  console.log('connected to mysql');
});

for(i=0; i < rstoredataId.length; i++) {
  let id = rstoredataId[i];

  let data = {
    'ID': rstoredata[id]['物件No.'],
    'Name': rstoredata[id]['物件No.'],
    'Rent': Number(rstoredata[id]['家賃'].replace(/[^0-9]/g, '')),
    'Space': rstoredata[id]['面積'].replace(/[^\d+\.\d+]/, ''),
    'Address': rstoredata[id]['所在地']
  }

  con.query('insert into rstore set ?', data, (err, res)  => {
    if (err) throw err + data.ID;
    console.log('success!   ' + data.ID);
  });
}

con.end((err) => {
  if (err) throw err;

  console.log('disconnected to mysql');
});