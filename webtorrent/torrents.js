window.$ = window.jQuery = require.main.require('jquery');
var WebTorrent = require.main.require('webtorrent')
var client = new WebTorrent()

client.on('error', function (err) {
    console.error('ERROR: ' + err.message)
})

$("button#main-add-torrent").click(function(e){
    e.preventDefault();
    var tLink = $(this).attr("torr");
    client.add(tLink,{ 
      path: "/Users/arilsonb/Downloads" 
    }, onTorrent);
});

function onTorrent (torrent) {

  var torrentId = $(".torr-list > #drop > li").attr("torrent-id");
  if(torrentId >= 0){
    torrentId = parseInt(torrentId) + 1;
  }

  $(".torr-list > #drop").append(
    "<li torrent-id='"+torrentId+"'>"+
    "<torrent magnet='"+torrent.magnetURI+"' hash='"+torrent.infoHash+"'>"+
    "<div class='torr-title'><span>"+torrent.name+"</span></div>"+
    "<progress class='progress' max='100' min='0' value='0'></progress>"+
    "<p class='vel'></p></torrent></li>");

  // Print out progress every 5 seconds
  var interval = setInterval(function () {
    var progressT = (torrent.progress * 100).toFixed(1);
    $(".progress").attr("value",progressT);
    var vel = (torrent.downloadSpeed / 1024).toFixed(2) + " KB/s";
    $(".vel").text(""+vel);
  }, 1000)

  torrent.on('done', function () {
    clearInterval(interval)
  })

  // Render all files into to the page
  torrent.files.forEach(function (file) {
    /*file.appendTo('.log')
    file.getBlobURL(function (err, url) {
      if (err) return log(err.message)
      //log('File done.')
      //log('<a href="' + url + '">Download full file: ' + file.name + '</a>')
    })*/
  })
}

function log (str) {
  var p = document.createElement('p')
  p.innerHTML = str
  document.querySelector('.log').appendChild(p)
}