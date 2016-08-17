const SimplePeer = require('simple-peer');
const EventEmitter = require('events').EventEmitter;
const io = require('socket.io-client');

const emitter = new EventEmitter();
const peers = [];

// peer connections options
const options = {
  trickle: true,
  config: {
    iceServers: [
      { url: "stun:stun.l.google.com:19302" },
      { url: "stun:stun1.l.google.com:19302" },
      { url: "stun:stun2.l.google.com:19302" },
      { url: "stun:stun3.l.google.com:19302" },
      { url: "stun:stun4.l.google.com:19302" },
    ]
  }
};

const socket = io();

export default function() {
  let selfId;

  socket.emit('join', 'test');
  // socket joined a room, start making connections
  socket.on('joined', sockets => {
    console.log('joined', sockets);
    selfId = sockets.pop();
    // if first one in room, done
    if (sockets.length === 0) {
      console.log('emit connected');
      emitter.emit('connected');
    } else {
      startConnection(sockets, 0, selfId);
    }
  });

  // new socket joined, receive the connection
  socket.on('new peer', () => {
    console.log('new peer connecting');
    receiveConnection(selfId);
  });

  return {
    onReady: cb => {
      emitter.on('connected', cb);
    },

    send: message => {
      peers.forEach(peer => { peer.send(message); });
    },

    onMessage: cb => {
      emitter.on('message', cb);
    }
  };
}

/* ------------ Helper functions ------------ */

function startConnection(sockets, number, selfId) {
  const peer = new SimplePeer(Object.assign(options, { initiator: true }));
  const remote = sockets[number];
  console.log('remote is', remote);
  peer.on('signal', data => {
    socket.emit('offer', { offer: data, by: socket.id, to: remote });
  });

  socket.on('answer', data => {
    console.log('got answer', data, 'remote is', remote, 'self is', selfId);
    if (data.to === selfId && data.by === remote) {
      peer.signal(data.answer);
      console.log(peer);
    }
  });

  peer.on('connect', () => {
    console.log('connected: peer is', peer);
    peers.push(peer);
    if (number < sockets.length - 1) {
      startConnection(sockets, ++number, selfId);
    } else {
      emitter.emit('connected');
    }
  });

  peer.on('data', message => {
    emitter.emit('message', message);
  });
}

function receiveConnection(selfId) {
  const peer = new SimplePeer(Object.assign(options, { initiator: false }));
  let remote;

  socket.on('offer', data => {
    if (data.to === selfId && !peer._channelReady) {
      console.log('got offer', data);
      remote = data.by;
      peer.signal(data.offer);
    }
  });

  peer.on('signal', data => {
    console.log('sending answer');
    socket.emit('answer', { answer: data, by: socket.id, to: remote });
  });

  peer.on('connect', () => {
    emitter.emit('connected');
    peers.push(peer);
  });

  peer.on('data', message => {
    emitter.emit('message', message);
  });
}

