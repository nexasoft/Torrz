const theme = {

    getOS: function(){
        var setOS = "win";
        if (window.navigator.userAgent.indexOf("Windows NT") != -1) setOS="win";
        if (window.navigator.userAgent.indexOf("Mac") != -1) setOS="mac";
        if (window.navigator.userAgent.indexOf("X11") != -1) setOS="unix";
        if (window.navigator.userAgent.indexOf("Linux") != -1) setOS="linux";
        
        return setOS;
    },
    loadTheme: function(){
        var themePath = this.getOS(); //this.getOS();
        $(".torrz-body").addClass(themePath);
    }

}

theme.loadTheme();