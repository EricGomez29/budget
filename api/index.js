const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const force = true;
conn.sync({ force }).then(() => {
  server.listen(3000, () => {
    console.log('%s listening at 3000');
  })
});