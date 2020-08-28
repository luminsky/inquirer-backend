const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./tests.db', (err) => {
  if (err) {
    console.log('an error connecting database');
  } else {
    console.log('database is connected');
  }
});

const queries = {
  insert(quiz) {
    return new Promise((resolve) => {
      const values = Object.values(quiz).map((e) =>
        e instanceof Object ? JSON.stringify(e) : e
      );

      const params = values.map(() => '?').join(',');

      db.run(
        `INSERT INTO tests (title, content) VALUES(${params})`,
        values,
        function (err) {
          if (err) resolve(false);
          resolve(this.lastID);
        }
      );
    });
  },
  delete(id) {
    return new Promise((resolve) =>
      db.exec(`DELETE FROM tests WHERE rowid = ${id};`, (err) => {
        if (err) resolve(false);
        resolve(true);
      })
    );
  },
  select(table) {
    return new Promise((resolve, reject) =>
      db.all(`SELECT rowid AS id,* FROM ${table};`, (err, row) => {
        if (err) reject(err);

        row.forEach((e) => (e.content = JSON.parse(e.content)));

        resolve(row);
      })
    );
  },
  async selectTests() {
    try {
      return await this.select('tests');
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

module.exports = { db, queries };
