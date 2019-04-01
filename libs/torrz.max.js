var app = require('electron').remote;
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;

window.$ = window.jQuery = require('jquery')
$(function(){
    alert("showbox");
});

$( window ).on("load", function() {
    console.log( "window loaded" );
});