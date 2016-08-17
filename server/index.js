/* Requires */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
/* Init */
const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

/* DB  */
const users = require('./db/connection').users;

/* Middleware */

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const pathToStaticDir = path.resolve(__dirname, '..', 'client/public');
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(express.static(pathToStaticDir));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: '1014211832028342',
    clientSecret: 'ac6ae8a72885b86270805337f66e83e6',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   console.log('this is the profile', profile.id);
   users.findAll({where: { facebookId: profile.id }
  }).then(user => {
      if (user.map(ind => {
        return ind.dataValues;
      }).length > 0) {
       console.log('user alredy exists',user);
     return done(null, user);
      } else {
        users.create({
          userName: profile.name.givenName + ' ' + profile.name.familyName,
          password: "N/A",
          facebookId:profile.id,
          token:accessToken,
        }).then(entry => {

          console.log(entry.dataValues, ' got entered',user);
             return done(null, user);
        });
      }
    });
  }
));

// serialize and deserialize
passport.serializeUser(function(user, done) {
  console.log('serializing!!!',user);
  done(null, user);
});

// passport.deserializeUser(function(id, done) {
//   console.log(id);
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// })




/* Sockets */


const rooms = {};
io.on('connection', socket => {
  console.log('user connected');
  socket.on('create room', roomId => {
    rooms[roomId] = [];
  });

  socket.on('join', room => {
    if (!rooms[room]) {
      console.log('Not a valid room');
      // send socket message to user?
      io.to(socket.id).emit('invalid room');
    } else {
      console.log('joining room', room);
      rooms[room] = rooms[room] || [];

      const numberOfClients = rooms[room].length;
      if (numberOfClients >= 4) {
        socket.emit('full', room);
      } else {
        socket.join(room);
        rooms[room] = rooms[room] || [];
        rooms[room].push(socket.id.slice(2));
        io.to(room).emit('new.peer', rooms[room]);

        socket.on('disconnect', () => {
          const socketsInRoom = rooms[room];
          socketsInRoom.splice(socketsInRoom.indexOf(socket.id.slice(2)), 1);
          console.log('disconnecting', socketsInRoom, socket.id);
          socket.leave(room);
        });
      }
    }
  });

  // TODO: add to room for offer/answer emits
  socket.on('offer', offer => {
    socket.broadcast.emit('offer', offer);
  });

  socket.on('answer', data => {
    socket.broadcast.emit('answer', data);
  });

});

/* Routes */
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.post('/login', (req, res) => {
  users.findAll({
    where: {
      userName: req.body.user,
      password: req.body.pass
    }
  }).then(user => {
    if (user.map(ind => {
        return ind.dataValues;
      }).length > 0) {
      console.log("succ logged in");
      res.send("Succ")
    } else {
      console.log('BadLogin');
      res.send("BadLogin");
    }
  });
});


app.post('/signup', (req,res) =>{
users.findAll({
      where: {
        userName: req.body.user
      }
    }).then(user => {
      if (user.map(ind => {
        return ind.dataValues;
      }).length > 0) {
       res.send('UserAlreadyExists');
      } else {
        users.create({
          userName: req.body.user,
          password: req.body.pass
        }).then(entry => {
          console.log(entry.dataValues, ' got entered');
           res.send('SuccessSignup');
        });
      }
    });

});


app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/login',
                                      failureRedirect: '/login' }));

app.get('*', (req, res) => {
  const pathToIndex = path.join(pathToStaticDir, 'index.html');
  res.status(200).sendFile(pathToIndex);
});


/* Initialize */

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Listening on port', port);
});




