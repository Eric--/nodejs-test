var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

emitter.on('someevent', function () {
	console.log('event has occured');
});

function f(){
	console.log('start');
	emitter.emit('someevent');
	console.log('end');
}

f();