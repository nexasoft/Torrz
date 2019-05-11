const fs = require.main.require("fs");
const path = require.main.require("path");

class Torrz {
    constructor(){
        this.client = new WebTorrent();
        this.client.on('error', function (err) {
            alert('ERROR: ' + err.message);
            $(".retrieving:last-child").remove();
        })
    }
    checkTorrents(){
        var files = fs.readdirSync("./torrents/");
        for (var file of files){
            var data = fs.readFileSync("./torrents/"+file, "utf8");
            data = JSON.parse(data);
            this.add(data["magnet"],data["path"]);
        }
    }
    add(magnet,path){
        if(!path){
            path = app.getPath("home")+"/Downloads/Torrz";
        }
        if(this.client.get(magnet) === null){
            this.client.add(magnet,{ 
                path: path
            }, this.onTorrent);

            var torr_item = ("<torrent class='retrieving animate-bottom' magnet='"+magnet+"'>"+
            "<div class='loader'></div><div>Retrieving torrent data...</div>"+
            "</torrent>");
            $(".torr-list").append(torr_item);
            console.log("adding... " + magnet)
        }else{
            console.log("can't duplicate");
        }
    }
    delete(magnet){
        var torrent = this.client.get(magnet);
        var filePath = "./torrents/"+torrent.name+".json";
        var torrPath = torrent.path + "/" + torrent.name + "/";
        this.client.remove(magnet);
        $("torrent[hash='"+torrent.infoHash+"'").remove();
        fs.unlinkSync(filePath);
        fs.unlinkSync(torrPath);
    }
    onTorrent(torrent){

        var torrentId = $(".torr-list > torrent").attr("torrent-id");
        if(torrentId >= 0){
          torrentId = parseInt(torrentId) + 1;
        }

        var thisTorrent = $(".torr-list").find("torrent.retrieving");
        thisTorrent.attr("magnet",torrent.magnetURI);


        thisTorrent.removeClass("retrieving");


        var tJson = '{"id": 0,"name": "'+torrent.name+'","hash": "'+torrent.infoHash+'","path": "'+torrent.path+'","magnet": "'+torrent.magnetURI+'"}';
        fs.writeFile("./torrents/"+torrent.name+".json",tJson,function(erro){
            if(erro) {
                throw erro;
            }else{
                
            }
        });


        thisTorrent = $(".torr-list").find("torrent[magnet='"+torrent.magnetURI+"']");
        thisTorrent.attr("hash",torrent.infoHash);
        var torrLay = ("<div class='torr-img'><img src='' /></div>"+
        "<div class='torr-cont'><progress class='torr-progress' max='100' value='0'></progress>"+
        "<span class='title'>"+torrent.name+"</span></div>");
        thisTorrent.html(torrLay);

        $(".pause").click(function(e){
            e.preventDefault();
            torrent.pause()
            torrent.wires = [];
        });

        $(".resume").click(function(e){
            for(var p in torrent._peers){
                torrent.wires.push(torrent._peers[p].wire);
            }
            torrent.resume();
        });

        torrent.on('done', function () {
            console.log("done");
            clearInterval(interval);
        });

        var interval = setInterval(function () {
            var progressT = (torrent.progress * 100).toFixed(1);
            thisTorrent.find("progress").val(progressT);
            var vel = (torrent.downloadSpeed / 1024).toFixed(2) + " KB/s";
        }, 1000);
    }
}

    var torrz = new Torrz();
    torrz.checkTorrents();
    $("#main-add-torrent").click(function(e){
        e.preventDefault();
        $(".boxed-notify").toggle();
    });
    $(".torr-add").submit(function(e){
        e.preventDefault();
        var valus = $(this).find("input[type=text]").val();
        torrz.add(valus);
    });
    $("#tDel").click(function(e){
        torrz.delete("magnet:?xt=urn:btih:6fc981ddc710c758ddc6c7929ea059b51e2d5039&dn=The.Tick.S01.720p.Dual.WWW.COMANDOTORRENTS.COM&tr=http%3A%2F%2Fbt.careland.com.cn%3A6969%2Fannounce&tr=http%3A%2F%2Fexodus.desync.com%2Fannounce&tr=http%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.blazing.de%2Fannounce&tr=http%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fa...&tr=http%3A%2F%2Ftracker.yify-torrents.com%2Fanno...&tr=http%3A%2F%2Fwww.h33t.com%3A3310%2Fannounce&tr=udp%3A%2F%2F11.rarbg.com%2Fannounce&tr=udp%3A%2F%2F12.rarbg.me%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2740%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ffr33dom.h33t.com%3A3310%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.1337x.org%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.ccc.de%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.ex.ua%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.istole.it%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.prq.to%2Fannounce&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.yify-torrents.com%3A80%2Fannounce");
    });
