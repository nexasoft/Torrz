client.on('error', function (err) {
    console.error('ERROR: ' + err.message)
  })
  
  document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault() // Prevent page refresh
  
    var torrentId = document.querySelector('form input[name=torrentId]').value
    log('Adding ' + torrentId)
    client.add(torrentId, onTorrent)
  })

  log('Got torrent metadata!')
  log(
    'Torrent info hash: ' + torrent.infoHash + ' ' +
    '<a href="' + torrent.magnetURI + '" target="_blank">[Magnet URI]</a> ' +
    '<a href="' + torrent.torrentFileBlobURL + '" target="_blank" download="' + torrent.name + '.torrent">[Download .torrent]</a>'
  )