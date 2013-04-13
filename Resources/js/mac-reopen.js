var preventCloseEvent = function() {
    var appWindow = Ti.UI.getCurrentWindow();

    appWindow.addEventListener(Ti.CLOSE, function(event) {
        appWindow.hide();
        event.preventDefault();
        return false;
    });

    return appWindow;
}

var os = Ti.Platform.name.toLowerCase()

if (os == 'darwin') {
    var appWindow = preventCloseEvent();
} else {
    var appWindow = Titanium.UI.getCurrentWindow();
}

if (os == 'darwin') {
    Ti.API.addEventListener("reopen", function (e) {
        if (!e.hasVisibleWindows) {
            appWindow.show();
            e.preventDefault();
        }
    });
}