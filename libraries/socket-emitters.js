// Utility methods that emit socket events




module.exports = {
  reply,
  notifyClient
};





function notifyClient({ socket, id, body, throwIfDisconnected = false }) {
  if (!socket.connected && throwIfDisconnected) throw { disconnectedSocket: true };
  socket.emit('notification', {
    id,
    jsonrpc: '2.0',
    result: {
      body,
      complete: true,
    }
  });
}





function reply({ socket, request, body, error = false, complete = true, throwIfDisconnected = false }) {
  if (!socket.connected && throwIfDisconnected) throw { disconnectedSocket: true };
  if (error) {
    socket.emit('reply', {
      jsonrpc: '2.0',
      error: body,
      id: request.id,
    });
  } else {
    socket.emit('reply', {
      jsonrpc: '2.0',
      result: {
        complete,
        body
      },
      id: request.id,
    });
  }
}
