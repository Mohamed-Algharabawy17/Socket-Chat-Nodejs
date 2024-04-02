

//#region configuration
const express = require('express');
const {createServer}  = require('http');
const path = require('path');
const bodyParser = require("body-parser")
const { Server } = require('socket.io');

const PORT = process.env.PORT||3002;

const app = express();
const server = createServer(app);
const io = new Server(server);
//#endregion

//#region  Parser Middle Ware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//#endregion

//#region Handle Requests
app.get('/', (req, res) => {
    // console.log(res.body);
    // console.log(req.body);
    res.sendFile(path.join(__dirname,"../Client_side/pages/index.html"))
});


io.on('connection', (socket) => {

    socket.on('chat_message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat_message', msg);
    });

});

//#endregion

server.listen(PORT, () => {
  console.log('server running at http://localhost:'+PORT);
});