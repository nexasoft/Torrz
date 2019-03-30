window.$ = window.jQuery = require("jquery");
$(function(){
    alert("showbox")
});

$( window ).on( "load", function() {
    console.log( "window loaded" );
});