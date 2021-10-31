const 
const esbuild = require('esbuild');

esbuild.buildSync({
  entryPoints: ['./lib/_http_agent.js'],
  bundle: false,
  minify: true,
  outfile: '[name]',
  platform: 'node'
})

