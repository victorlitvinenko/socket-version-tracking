#!/usr/bin/env node
const socket = require('socket.io-client')('http://localhost:5000');
const delay = 10;
socket.on('connect', function () {
    console.log('connected...');
    if (process.argv[2]) {
        console.log('sending ' + process.argv[2]);
        socket.emit('new version', process.argv[2]);
        setTimeout(() => {
            process.exit(0);
        }, delay);
    } else {
        console.log('usage: ./client.js <version>');
        process.exit(1);
    }
});
