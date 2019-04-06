const { app, BrowserWindow } = require.main.require('electron').remote;
const webtorrent = require.main.require('webtorrent');
window.$ = window.jQuery = require.main.require('jquery');
$(function(){
    $("#main-add-torrents").click(function(e){
        e.preventDefault();
        $(".torrent-add-pane").toggle();
    });
    $(".pref-pane-button").click(function(e){
        e.preventDefault();
        let pref = new BrowserWindow({ width: 600, height: 450, parent: top, modal: true, titleBarStyle: 'hiddenInset', frame: true }) 
        pref.loadURL(url.format({
            pathname: path.join(__dirname, 'layout/preferences.html'),
            protocol: 'file:',
            slashes: true
        }))
    })
    $(".main-left-bar > ul > li > a").click(function(e){
        e.preventDefault();
        var refURI = $(this).attr("href");
        $(".main-container").load(refURI);
        
    });
});

$( window ).on("load", function() {
    console.log( "window loaded" );
});