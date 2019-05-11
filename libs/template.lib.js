$(function(){
    loadTemplate();
    function loadTemplate(){
        var OSNome = "win";
        if (window.navigator.userAgent.indexOf("Windows NT") != -1) OSNome="win";
        if (window.navigator.userAgent.indexOf("Mac") != -1) OSNome="mac";
        if (window.navigator.userAgent.indexOf("X11") != -1) OSNome="unix";
        if (window.navigator.userAgent.indexOf("Linux") != -1) OSNome="linux";

        var tempPath = "./ui/"+OSNome+"/";
        var temp1 = $.ajax({url: tempPath + "header.html", async:false}).responseText;
        var temp2 = $.ajax({url: tempPath + "content.html", async:false}).responseText;
        var temp3 = $.ajax({url: tempPath + "footer.html", async:false}).responseText;

        var data = temp1 + temp2 + temp3;
        return $(".body-main").html(data);
    }

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