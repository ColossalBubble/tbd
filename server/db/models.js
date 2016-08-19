const Sequelize = require('sequelize');
const sequelize = new Sequelize('tbd', 'root', '12345');

const users = sequelize.define('user', {
  userName: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  facebookId: {
    type: Sequelize.STRING
  },
  token: {
    type: Sequelize.STRING
  }
}, {
  tableName: 'users',
  timestamps: false,
});


sequelize
  .sync({ force: false })
  .then( () => {
    console.log('It worked!');
  }, err => {
    console.log('An error occurred while creating the table:', err);
  });
  
const instruments = sequelize.define('instruments', {
  userName: {
    type: Sequelize.STRING
  },
  instrumentName: {
    type: Sequelize.STRING
  },
  a: {
    type: Sequelize.STRING
  },
  s: {
    type: Sequelize.STRING
  },
  d: {
    type: Sequelize.STRING
  },
  f: {
    type: Sequelize.STRING
  },
  g: {
    type: Sequelize.STRING
  },
  h: {
    type: Sequelize.STRING
  },
  j: {
    type: Sequelize.STRING
  },
  k: {
    type: Sequelize.STRING
  },
  l: {
    type: Sequelize.STRING
  }

}, {
  tableName: 'instruments',
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
  .sync({ force: false })
  .then(err => {
    console.log('It worked!');
  }, err => {
    console.log('An error occurred while creating the table:', err);
  });

module.exports.users=users;
module.exports.instruments=instruments;
