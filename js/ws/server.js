/**
 * Created by Administrator on 2017/3/19.
 */

var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8181});
wss.on('connection', function (ws) {
    console.log('client connected');
    ws.on('message', function (msg) {
        console.log("server receive msg");
        ws.send('server send: ' + msg);
    });
});

