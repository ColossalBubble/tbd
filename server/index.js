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

/* Middleware */

app.use(logger('dev'));

const pathToStaticDir = path.resolve(__dirname, '..', 'client/public');
app.use(express.static(pathToStaticDir));

/* Sockets */


const rooms = {};
io.on('connection', socket => {
  socket.on('create room', roomId => {
    rooms[roomId] = [];
  });

  socket.on('join', room => {
    if (!rooms[room]) {
      // send socket message to user?
      io.to(socket.id).emit('invalid room');
    } else {
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
          const index = socketsInRoom.indexOf(socket.id.slice(2));
          if (index > -1) {
            socketsInRoom.splice(index, 1);
            socket.leave(room);
          }
        });
      }
    }
  });

  socket.on('exit room', data => {
    const room = rooms[data.room];
    const index = room.indexOf(data.id);
    room.splice(index, 1);
  });

  socket.on('offer', offer => {
    socket.broadcast.to(`/#${offer.to}`).emit('offer', offer);
  });

  socket.on('answer', answer => {
    socket.broadcast.to(`/#${answer.to}`).emit('answer', answer);
  });
});

/* Routes */

app.get('*', (req, res) => {
  const pathToIndex = path.join(pathToStaticDir, 'index.html');
  res.status(200).sendFile(pathToIndex);
});

/* Initialize */

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Listening on port', port);
});
