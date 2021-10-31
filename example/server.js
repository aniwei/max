const fs = require('fs');
const path = require('path');
const stat = fs.statSync(path.resolve(__dirname, 'nat.js'))
debugger;

const nat = require('./nat')