/**
 * Created by Administrator on 2017/3/19.
 */

var WebSocket = require('ws'),
    WebSocketServer = WebSocket.Server,
    wss = new WebSocketServer({port: 8181});
wss.on('connection', function (ws) {
    console.log('client connected');
    var count = 0;
    function sendData(){
        var city = {
            name: "sichuan",
            city: "chengdu"
        };
        if ( count < 10) {
            if(ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(city));
            }
            count++;
        }else{
            closeWs();
        }
    }
    var intervalId = setInterval(sendData, 2000);

    ws.on('message', function (msg) {
        console.log("server receive msg=" + msg);
        if(msg && msg == 'close'){
            closeWs();
        }
    });

    function closeWs(){
        if(intervalId){
            clearInterval(intervalId);
        }
        if(ws.readyState === WebSocket.OPEN){
            ws.close();
        }
    }
});

