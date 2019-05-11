$(".torrz-add-btn").click(function(e){
    e.preventDefault();
    var torrzAdd = $(".torrz-add");
    torrzAdd.toggle(100);
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
$("aside.left-bar > ul > li > a").click(function(e){
    e.preventDefault();
    var refURI = $(this).attr("href");
    $(".container").load(refURI);
});

$(".play-btn").click(function(e){
    e.preventDefault();
    $.each( $( "torrent.selected" ), function() {
        var selT = $(this).attr("magnet");
        return torrz.resume(selT);
    });
});
$(".pause-btn").click(function(e){
    e.preventDefault();
    $.each( $( "torrent.selected" ), function() {
        var selT = $(this).attr("magnet");
        return torrz.stop(selT);
    });
});

$(".remove-btn").click(function(e){
    e.preventDefault();
    $.each( $( "torrent.selected" ), function() {
        var selT = $(this).attr("magnet");
        return torrz.remove(selT);
    });
});

$(".add-torrent").submit(function(e){
    e.preventDefault();
    var tTorrent = $(this).find("input[type='text']").val();
    torrz.add(tTorrent);
});


$(document).on('click', 'torrent', function(e){
    e.preventDefault();
    $(this).toggleClass("selected");
});

$(document).on('dblclick', 'torrent', function(e){
    e.preventDefault();
    var thisT = $(this).attr("magnet");
    $(".torr-details").attr("tmagnet",thisT);
    var tItem = $(".torr-details[tmagnet='"+thisT+"']");
    torrz.tdetails(thisT);
    tItem.empty();
    tItem.toggle();
});

