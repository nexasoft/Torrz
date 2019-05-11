var less = {
    env: "production",
    logLevel: 0,
    async: false,
    fileAsync: false,
    poll: 1000,
    functions: {},
    dumpLineNumbers: "comments",
    relativeUrls: false,
    globalVars: {
      var1: '"quoted value"',
      var2: 'regular value'
    },
    rootpath: ":/a.com/"
  };
  
less.refresh = function (reload, modifyVars, clearFileCache) {
    if ((reload || clearFileCache) && clearFileCache !== false) {
        fileManager.clearFileCache();
    }
    return new Promise(function (resolve, reject) {
        var startTime, endTime, totalMilliseconds;
        startTime = endTime = new Date();
  
            // Change 1
        var remainingSheets = less.sheets.length;
  
        loadStyleSheets(function (e, css, _, sheet, webInfo) {
            if (e) {
                errors.add(e, e.href || sheet.href);
                reject(e);
                return;
            }
            if (webInfo.local) {
                less.logger.info("loading " + sheet.href + " from cache.");
            } else {
                less.logger.info("rendered " + sheet.href + " successfully.");
            }
            browser.createCSS(window.document, css, sheet);
            less.logger.info("css for " + sheet.href + " generated in " + (new Date() - endTime) + 'ms');
  
            // Change 2
            remainingSheets--;
            // Change 3
            if (remainingSheets === 0) { // (webInfo.remaining === 0) {
                totalMilliseconds = new Date() - startTime;
                less.logger.info("less has finished. css generated in " + totalMilliseconds + 'ms');
                resolve({
                    startTime: startTime,
                    endTime: endTime,
                    totalMilliseconds: totalMilliseconds,
                    sheets: less.sheets.length
                });
            }
            endTime = new Date();
        }, reload, modifyVars);
  
        loadStyles(modifyVars);
    });
};