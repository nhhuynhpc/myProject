const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'my_project',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
)

sequelize.authenticate().then(() => {
  console.log('Connection established successfully');
}).catch(err => {
  console.log('Unable to connect: ' + err);
});

module.exports = sequelize;