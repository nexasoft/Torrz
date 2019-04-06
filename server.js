const path = require.main.require('path')
const url = require.main.require('url')

var serveStatic = require.main.require('serve-static');
const connect = require.main.require('connect'),
    directory = path.join(__dirname, './');

connect()
    .use(serveStatic(directory))
    .listen(1922);