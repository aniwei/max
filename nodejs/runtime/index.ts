import { NodeJS } from './Node';

const nodejs = new NodeJS();

nodejs
  .init()
  .boot()
  .run(`server.js`)
