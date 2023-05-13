const express = require('express');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
const server = require('http').createServer(app);

var io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});
server.listen(PORT, function () {
  console.log('Server listening at port %d', PORT);
});

io.on('connection', function (socket) {
  socket.on('updateCompanionList', function (data) {
    console.log(data);
    fs.writeFile(
      'companion_list.json',
      JSON.stringify(data),
      function (err, file) {
        if (err) throw err;
      }
    );
  });

  socket.on('load', function () {
    fs.readFile('all_users_routine.json', 'utf8', function (err, data1) {
      if (err) {
        return console.log(err);
      }
      try {
        const all_users_routine = JSON.parse(data1);

        fs.readFile('companion_list.json', 'utf8', function (err, data2) {
          if (err) {
            return console.log(err);
          }
          try {
            const companion_list = JSON.parse(data2);
            const toSend = all_users_routine.filter(({ name }) =>
              companion_list.includes(name)
            );
            console.log(toSend);
            socket.emit('list', toSend);
          } catch (err) {
            console.log(err);
            socket.emit('list', []);
          }
        });
      } catch (err) {
        console.log(err);
        socket.emit('list', []);
      }
    });
  });
});
