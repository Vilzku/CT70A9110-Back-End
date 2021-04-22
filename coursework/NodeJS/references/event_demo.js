const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
    pass;
}

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
    console.log("Event fired!");
});

myEmitter.emit('event');
myEmitter.emit('event');
myEmitter.emit('event');
myEmitter.emit('event');