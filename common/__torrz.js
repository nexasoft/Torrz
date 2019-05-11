class Torrz {
    constructor(){
        this.client = new WebTorrent();
        this.client.on('error', function (err) {
            alert('ERROR: ' + err.message);
            $(".retrieving").last().remove();
        })
    }
    checkTorrents(){
        const paths = fs.readdirSync('./torrents/');
        for (var x in paths){
            var data = fs.readFileSync("./torrents/"+paths[x], "utf8");
            data = JSON.parse(data);
            var magnet = data["magnet"];
            var path = data["path"];
            if(this.client.get(magnet) === null){
                this.add(magnet,path);
            }else{
            }
        }
    }
    add(magnet,path){
        if(!path){
            path = app.getPath("home")+"/Downloads/Torrz";
        }
        if(this.client.get(magnet) === null){

            var torr_id = $("torrent").last().attr("torr_id");
            if(torr_id == null){
                torr_id = 0 + 1;
            }else{
                torr_id = parseInt(torr_id) + 1;
            }

            this.client.add(magnet,{ 
                path: path
            }, this.onTorrent);

            var torr_item = ("<torrent class='retrieving animate-bottom' torr_id='"+torr_id+"'>"+
            "<div class='torr-img'><div class='loader'></div></div><span class='torr-title'>Retrieving torrent data...</span></torrent>");
            $(".torr-list").append(torr_item);
        }else{
            alert("can't duplicate");
        }
    }
    start(magnet){
        return false;
    }
    stop(magnet){
        let torrent = this.client.get(magnet);
        if(torrent === null){
            console.log("torrent: "+magnet+", doesn't exists.")
        }else{
            torrent.pause();
            torrent.wires = [];
        }
    }
    resume(magnet){
        let torrent = this.client.get(magnet);
        if(torrent === null){
            console.log("torrent: "+magnet+", doesn't exists.")
        }else{
            for(var p in torrent._peers){
                torrent.wires.push(torrent._peers[p].wire);
            }
            torrent.resume();
            var thisTorrent = $("torrent[magnet='"+torrent.magnetURI+"']")
            var interval = setInterval(function () {
                var progressT = (torrent.progress * 100).toFixed(1);
                thisTorrent.find("progress").val(progressT);
                var vel = (torrent.downloadSpeed / 1024).toFixed(2) + " KB/s";
            }, 1000);
        }
    }
    remove(magnet){
        let torrent = this.client.get(magnet);
        if(torrent === undefined){
            console.log("torrent: "+magnet+", doesn't exists.")
        }else{
            var filePath = "./torrents/"+torrent.name+".json";
            var torrPath = torrent.path + "/" + torrent.name + "/";
            this.client.remove(magnet);
            $("torrent[magnet='"+torrent.magnetURI+"']").remove();
            fs.unlinkSync(filePath);
            fs.unlinkSync(torrPath);
            torrent.remove();
            torrent.destroy();
            this.client.get(magnet) = null;
        }
    }
    tdetails(magnet){
        var torrent = this.client.get(magnet);
        var tItem = $(".torr-details[tmagnet='"+torrent.magnetURI+"']");
        setInterval(function () {
            var i1 = ('Progress: ' + (torrent.progress * 100).toFixed(1) + '% <br />');
            var i2 = ('numPeers: ' + torrent.numPeers + "<br />");
            var i3 = ('uploadSpeed: ' + (torrent.uploadSpeed / 1024).toFixed(2) + " KB/s <br />");
            var i4 = ('downloadSpeed: ' + (torrent.downloadSpeed / 1024).toFixed(2) + " KB/s <br />");
            tItem.html(i1+i2+i3+i4);
        }, 500)
    }
    createJson(torrent){
        return false;
    }
    onTorrent(torrent){

        var thisTorrent = $(".torr-list").find("torrent").last();

        thisTorrent.attr("magnet",torrent.magnetURI);
        thisTorrent.attr("hash",torrent.infoHash);
        thisTorrent.removeClass("retrieving");

        
        // Create json file
        var tJson = '{"id": 0,"name": "'+torrent.name+'","hash": "'+torrent.infoHash+'","path": "'+torrent.path+'","magnet": "'+torrent.magnetURI+'"}';
        fs.writeFile("./torrents/"+torrent.name+".json",tJson,function(erro){
            if(erro) {
                throw erro;
            }else{
                
            }
        });

        function truncar(texto,limite){
            if(texto.length>limite){ 
                limite--;
                var last = texto.substr(limite-1,1);
                while(last!=' ' && limite > 0){
                    limite--;
                    last = texto.substr(limite-1,1);
                }
                last = texto.substr(limite-2,1);
                if(last == ',' || last == ';'  || last == ':'){
                     texto = texto.substr(0,limite-2) + '...';
                } else if(last == '.' || last == '?' || last == '!'){
                     texto = texto.substr(0,limite-1);
                } else {
                     texto = texto.substr(0,limite-1) + '...';
                }
            }
            return texto;
        }

        thisTorrent = $(".torr-list").find("torrent").last();
        thisTorrent.attr("hash",torrent.infoHash);
        var torrLay = ("<div class='torr-img'><img src='' /></div>"+
        "<progress class='torr-progress' max='100' value='0'></progress>"+
        "<span class='torr-title'>"+truncar(torrent.name,65)+"</span>");
        thisTorrent.html(torrLay);

        torrent.on('done', function () {
            console.log("done");
            clearInterval(interval);
        });

        var interval = setInterval(function () {
            var progressT = (torrent.progress * 100).toFixed(1);
            thisTorrent.find("progress").val(progressT);
            var vel = (torrent.downloadSpeed / 1024).toFixed(2) + " KB/s";
        }, 1000);
        torrent.on('wire', function (wire, addr) {
            console.log('connected to peer with address ' + addr)
        })
        setInterval(function () {
            console.log('Progress: ' + (torrent.progress * 100).toFixed(1) + '%');
            console.log('numPeers: ' + torrent.numPeers);
            console.log('uploadSpeed: ' + (torrent.uploadSpeed / 1024).toFixed(2) + " KB/s");
            console.log('downloadSpeed: ' + (torrent.downloadSpeed / 1024).toFixed(2) + " KB/s");
        }, 5000)
        
    }
}
