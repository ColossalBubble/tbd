/* Requires */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const expressSession=require('express-session');
const cookieParser = require('cookie-parser');
require("dotenv").config()
/* Init */
const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);
/* DB  */
const users = require('./db/connection').users;

/* Middleware */
app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const pathToStaticDir = path.resolve(__dirname, '..', 'client/public');
app.use(express.static(pathToStaticDir));
app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: process.env.client_Id,
  clientSecret: process.env.client_Secret,
  callbackURL: "http://localhost:3000/auth/facebook/callback"
},

  (accessToken, refreshToken, profile, done) => {
    console.log('this is the profile', profile.id);
    users.findAll({ where: { facebookId: profile.id }
  }).then(user => {
    if (user.map(ind => {
      return ind.dataValues;
    }).length > 0) {
      console.log('user already exists', user[0]);
      //console.log('this is req.sesion', req.session);
      return done(null, user);
    } else {
      users.create({
        userName: ` ${profile.name.givenName} ${profile.name.familyName}`,
        password: "N/A",
        facebookId: profile.id,
        token: accessToken,
      }).then(entry => {
        //console.log('this is req.sesion', req.session);
        console.log('this is entry for a newly added user', entry.dataValues.id);
        console.log(entry.dataValues, ' got entered', entry);
        return done(null, entry.dataValues.id);
      });
    }
  });
  }
));


// serialize and deserialize
passport.serializeUser((user, done) => {
  const final = typeof user==="number"?user:user[0].dataValues.id;
  console.log('this is the user param', user);
  console.log('serializing!!!', final);
  done(null, final);
});

passport.deserializeUser((id, done) => {
  console.log('this is id in deserialize', id);
  users.findAll({ where: { id: id } }).then(found => {
    console.log('im trying to des this user', found[0].dataValues);
    done(null, id);
  });
});


const rooms = {};

io.on('connection', socket => {

  console.log('Socket connected with ID: ', socket.id);
  
  socket.on('create room', roomId => {
    rooms[roomId] = [];
  });

  socket.on('join', room => {
    console.log(socket.id, 'joining', room);
    // does room exist?
    if (!rooms[room]) {
      io.to(socket.id).emit('invalid room');
    // is room full?
    } else if (rooms[room].length >= 4) {
      socket.emit('full', room);
    } else {
      socket.join(room);
      rooms[room].push(socket.id.slice(2));
      console.log('room is', rooms[room]);
      // emit message to socket which just joined
      io.to(socket.id).emit('joined', rooms[room]);
      // emit message to other sockets in room
      socket.broadcast.to(room).emit('new peer');

      socket.on('disconnect', () => {
        const socketsInRoom = rooms[room];
        const id = socket.id.slice(2);
        const index = socketsInRoom.indexOf(id);
        if (index > -1) {
          console.log('disconnect', id);
          socketsInRoom.splice(index, 1);
          socket.leave(room);
          socket.broadcast.to(room).emit('remove connection', id);
        }
      });
    }
  });

  socket.on('exit room', data => {
    const room = rooms[data.room];
    if (room !== undefined) {
      const index = room.indexOf(data.id);
      console.log('exit room', data);
      room.splice(index, 1);
      socket.leave(data.room);
      // socket.broadcast.to(`/#${data.id}`).emit('close');
      console.log(rooms[data.room]);
      socket.broadcast.to(data.room).emit('remove connection', data.id);
    }
  });

  socket.on('offer', offer => {
    io.to(`/#${offer.to}`).emit('offer', offer);
  });

  socket.on('answer', answer => {
    io.to(`/#${answer.to}`).emit('answer', answer);
  });
});

/* Routes */
app.get('/logout', (req, res) => {
  console.log('mysession', req.session);
  if (req.session.userName){
    delete req.session.userName;
  }
  req.logout();
  console.log('mysession after logout', req.session);
  res.send('N/A!');
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
      req.session.userName = req.body.user;
      res.send("Succ");
    } else {
      console.log('BadLogin');
      console.log('req.session', req.session);
      res.send("BadLogin");
    }
  });
});


app.post('/signup', (req, res) => {
  users.findAll({
    where: {
      userName: req.body.user
    }
  }).then(user => {
    if (user.map(ind => {
      return ind.dataValues;
    }).length > 0) {
      console.log('this is req.sesion', req.session);
      res.send('UserAlreadyExists');
    } else {
      users.create({
        userName: req.body.user,
        password: req.body.pass
      }).then(entry => {
        console.log(entry.dataValues, ' got entered');
        req.session.userName = req.body.user;
        res.send('SuccessSignup');
      });
    }
  });
});


app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successReturnToOrRedirect: '/', failureRedirect: '/login' }
      ));

app.get("/fbLoggedIn?", (req, res) => {

  console.log(req.session.passport);
  res.send(req.session.passport?"true":"false")
});


app.get('*', (req, res) => {
  console.log('req.session',req.session);
  const pathToIndex = path.join(pathToStaticDir, 'index.html');
  res.status(200).sendFile(pathToIndex);
});


/* Initialize */

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Listening on port', port);
});
