var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function(){
    console.log('laczy')
  socket.emit('authentication', {email: "te@gmail.com", password: "1111"});
  socket.on('authenticated', function() {
    socket.emit('delete')
    console.log('polaczony')
  });
  socket.on('err', function(e) {
    console.log('error:', e)
  });
});

socket.on('disconnect', function(){
   
      console.log('disconnect')
  });