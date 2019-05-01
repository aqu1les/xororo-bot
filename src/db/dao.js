const sqlite3 = require('sqlite3');
const pathDB = 'src/db/database.db';
const pathDBlocal = './database.db';

let db = new sqlite3.Database(pathDB, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
});

db.run(`CREATE TABLE IF NOT EXISTS users(
    ID VARCHAR UNIQUE NOT NULL,
    NAME VARCHAR(255) NOT NULL,
    XESQUES INTEGER DEFAULT 0
);`, err => {
    if (err) console.log(err);
});

db.all('SELECT * FROM users;', (err, user) => {
    if(err) console.log(err);
    if(user.length > 0) {
        console.log(user);
    }
});
module.exports = db;
