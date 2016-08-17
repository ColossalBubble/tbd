const Sequelize = require('sequelize');

const sequelize = new Sequelize('tbd', 'root', '12345');

const users = sequelize.define('user', {
  userName: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
}, {
  tableName: 'users',
  timestamps: false,
});


sequelize
  .authenticate()
  .then(err => {
    console.log('sqlz Connection has been established successfully.');
  })
  .catch(err => {
    console.log('sqlz Unable to connect to the database:', err);
  });

sequelize
  .sync( {force:false} )
  .then(err => {
    console.log('It worked!');
  }, err => {
    console.log('An error occurred while creating the table:', err);
  });

module.exports.users=users;
