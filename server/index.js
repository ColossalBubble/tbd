/* Requires */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const http = require('http');
const socketIO = require('socket.io');
/* Init */
const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

/* DB  */
const users = require('./db/connection').users;

/* Middleware */

app.use(logger('dev'));

const pathToStaticDir = path.resolve(__dirname, '..', 'client/public');
app.use(express.static(pathToStaticDir));
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

  socket.on('createUser', data => {
    users.findAll({
      where: {
        userName: data.user
      }
    }).then(user => {
      if (user.map(ind => {
        return ind.dataValues;
      }).length > 0) {
        io.to(socket.id).emit('UserAlreadyExists', 'User Already Exists');
      } else {
        io.to(socket.id).emit('SuccessSignup', 'We added you!');

        users.create({
          userName: data.user,
          password: data.pass
        }).then(entry => {
          console.log(entry.dataValues, ' got entered');
        });
      }
    });
  });

  socket.on('loginUser', data => {
    users.findAll({
      where: {
        userName: data.user,
        password: data.pass
      }
    }).then(user => {
      if (user.map(ind => {
        return ind.dataValues;
      }).length > 0) {
        io.to(socket.id).emit('SuccessLogin', 'Login Succesful');
      } else {
        io.to(socket.id).emit('BadLogin', 'Bad Login!');
      }
    });
  });
});

/* Routes */

app.get('/', (req, res) => {
  const pathToIndex = path.join(pathToStaticDir, 'index.html');
  res.status(200).sendFile(pathToIndex);
});

/* Initialize */

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Listening on port', port);
});




