var ipaddress = '1.1.1.1' // Change this to your Pi's IP address!
let port = 3000

var socket = io( `http://${ ipaddress }:${ port }` );

socket.on( "disconnect", function() {
	setTitle( "Disconnected" );
});

socket.on( "connect", function() {
	setTitle( "Connected to Robot" );
});

socket.on( "message", function( message ) {
	printMessage( message );
});

function setTitle( title ) {
    document.querySelector( "h1" ).innerHTML = title;
}

function printMessage( message ) {
    var p = document.createElement( "p" );
    p.innerText = message;
    document.querySelector( "div.messages" ).innerHTML = "";
    document.querySelector( "div.messages" ).appendChild( p );
}
