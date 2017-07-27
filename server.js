let http_port = 3000 // don't forget to change this is main.js if you change it here

var express = require( "express" );
var app = express();
var http = require( "http" );
app.use( express.static( "./public" ) );
var http_server = http.createServer( app ).listen( http_port );
var http_io = require( "socket.io" )( http_server );

http_io.on( "connection", function( httpsocket ) {

	httpsocket.emit( "message", "Welcome to Craig's Robot!" );

	httpsocket.on( 'python-message', function( fromPython ) {

		httpsocket.broadcast.emit( 'message', fromPython );
		// console.log( fromPython );
	});

});

console.log( `Starting sockets on port ${ http_port }` );

