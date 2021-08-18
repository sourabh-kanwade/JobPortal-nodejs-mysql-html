const mysql = require('mysql');
let db = mysql.createConnection('mysql://root:Sourabh@12@localhost/JobPortal');
db.connect((err) => {
    if (err) throw err;
    return console.log('Connected to DB.');
});
module.exports = db;
