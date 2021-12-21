/************************************/
/* Store and Load window properties */
/************************************/

var windowPropertiesFile = Ti.Filesystem.getFile(Ti.API.application.dataPath, "window.properties");
var MainWindow = Ti.UI.getMainWindow();
var windowProperties;

//if file exists, then load properties.
if(windowPropertiesFile.exists()) {
    windowProperties = Ti.App.loadProperties(windowPropertiesFile.nativePath());
    //read properties, if error then set default
    if(!windowProperties.hasProperty('positionX'))
    	windowProperties.setInt('positionX',MainWindow.getX());
    if(!windowProperties.hasProperty('positionY'))
    	windowProperties.setInt('positionY',MainWindow.getY());
    if(!windowProperties.hasProperty('windowHeight'))
    	windowProperties.setInt('windowHeight',MainWindow.getMinHeight());
    if(!windowProperties.hasProperty('windowWidth'))
    	windowProperties.setInt('windowWidth',MainWindow.getMinWidth());
    if(!windowProperties.hasProperty('isMaximized'))
    	windowProperties.setBool('isMaximized',true);
} else {
//create new set of properties if file doesn't exist
	windowProperties = Ti.App.createProperties({
		positionX : MainWindow.getX(),
		positionY : MainWindow.getY(),
		windowHeight : MainWindow.getMinHeight(),
		windowWidth : MainWindow.getMinWidth(),
		isMaximized : true
	});
}

//modify window with stored properties
MainWindow.setX(windowProperties.getInt('positionX'));
MainWindow.setY(windowProperties.getInt('positionY'));
MainWindow.setHeight(windowProperties.getInt('windowHeight'));
MainWindow.setWidth(windowProperties.getInt('windowWidth'));
if(windowProperties.getBool('isMaximized')) {
	MainWindow.maximize();
}

//store new properties when app close
Ti.API.addEventListener(Ti.APP_EXIT, function () {
	windowProperties = Ti.App.createProperties({
		positionX : MainWindow.getX(),
		positionY : MainWindow.getY(),
		windowHeight : MainWindow.getHeight(),
		windowWidth : MainWindow.getWidth(),
		isMaximized : MainWindow.isMaximized()
	});
//store to file
	windowProperties.saveTo(windowPropertiesFile.nativePath());
});

/************************************/
/* Store and Load app configuration */
/************************************/

//create small functions to store an read from cookie
/* function setCookie(c_name,value) {
	var exdate = new Date();
	var exdays = 365;
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name) {
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1) {
		c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1) {
		c_value = null;
	} else {
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1) {
			c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}

var appPropertiesFile = Ti.Filesystem.getFile(Ti.API.application.dataPath, "application.properties");
var appProperties = Ti.App.createProperties();

if(appPropertiesFile.exists()) {
//read settings from properties file and store in cookie
    appProperties = Ti.App.loadProperties(appPropertiesFile.nativePath());
    if(appProperties.hasProperty('AutoPlay')) setCookie('AutoPlay', appProperties.getBool('AutoPlay'));
    if(appProperties.hasProperty('HideAZ')) setCookie('HideAZ', appProperties.getBool('HideAZ'));
    if(appProperties.hasProperty('ScrollTitle')) setCookie('ScrollTitle', appProperties.getBool('ScrollTitle'));
    if(appProperties.hasProperty('Debug')) setCookie('Debug', appProperties.getBool('Debug'));
    if(appProperties.hasProperty('ForceFlash')) setCookie('ForceFlash', appProperties.getBool('ForceFlash'));
    if(appProperties.hasProperty('Protocol')) setCookie('Protocol', appProperties.getString('Protocol'));
    if(appProperties.hasProperty('NotificationSong')) setCookie('NotificationSong', appProperties.getBool('NotificationSong'));
    if(appProperties.hasProperty('NotificationNowPlaying')) setCookie('NotificationNowPlaying', appProperties.getBool('NotificationNowPlaying'));
    if(appProperties.hasProperty('SaveTrackPosition')) setCookie('SaveTrackPosition', appProperties.getBool('SaveTrackPosition'));
    if(appProperties.hasProperty('Theme')) setCookie('Theme', appProperties.getString('Theme'));
    if(appProperties.hasProperty('AutoPlaylists')) setCookie('AutoPlaylists', appProperties.getString('AutoPlaylists'));
    if(appProperties.hasProperty('AutoAlbumSize')) setCookie('AutoAlbumSize', appProperties.getString('AutoAlbumSize'));
    if(appProperties.hasProperty('AutoPlaylistSize')) setCookie('AutoPlaylistSize', appProperties.getString('AutoPlaylistSize'));
    if(appProperties.hasProperty('ApplicationName')) setCookie('ApplicationName', appProperties.getString('ApplicationName'));
    if(appProperties.hasProperty('Username')) setCookie('Username', appProperties.getString('Username'));
    if(appProperties.hasProperty('Password')) setCookie('Password', appProperties.getString('Password'));
    if(appProperties.hasProperty('Server')) setCookie('Server', appProperties.getString('Server'));
    if(appProperties.hasProperty('SavedCollections')) setCookie('SavedCollections', appProperties.getString('SavedCollections'));
    if(appProperties.hasProperty('splitter1')) setCookie('splitter1', appProperties.getString('splitter1'));
    if(appProperties.hasProperty('splitter2')) setCookie('splitter2', appProperties.getString('splitter2'));
    if(appProperties.hasProperty('splitter3')) setCookie('splitter3', appProperties.getString('splitter3'));
    if(appProperties.hasProperty('splitter4')) setCookie('splitter4', appProperties.getString('splitter4'));
}

Ti.API.addEventListener(Ti.APP_EXIT, function () {
//read settings from cookie and store it in properties file
	if (getCookie('AutoPlay')) appProperties.setBool('AutoPlay',getCookie('AutoPlay'));
	if (getCookie('HideAZ')) appProperties.setBool('HideAZ',getCookie('HideAZ'));
	if (getCookie('ScrollTitle')) appProperties.setBool('ScrollTitle',getCookie('ScrollTitle'));
	if (getCookie('Debug')) appProperties.setBool('Debug',getCookie('Debug'));
	if (getCookie('ForceFlash')) appProperties.setBool('ForceFlash',getCookie('ForceFlash'));
	if (getCookie('Protocol')) appProperties.setString('Protocol',getCookie('Protocol'));
	if (getCookie('NotificationSong')) appProperties.setBool('NotificationSong',getCookie('NotificationSong'));
	if (getCookie('NotificationNowPlaying')) appProperties.setBool('NotificationNowPlaying',getCookie('NotificationNowPlaying'));
	if (getCookie('SaveTrackPosition')) appProperties.setBool('SaveTrackPosition',getCookie('SaveTrackPosition'));
	if (getCookie('Theme')) appProperties.setString('Theme',getCookie('Theme'));
	if (getCookie('AutoPlaylists')) appProperties.setString('AutoPlaylists',getCookie('AutoPlaylists'));
	if (getCookie('AutoAlbumSize')) appProperties.setString('AutoAlbumSize',getCookie('AutoAlbumSize'));
	if (getCookie('AutoPlaylistSize')) appProperties.setString('AutoPlaylistSize',getCookie('AutoPlaylistSize'));
	if (getCookie('ApplicationName')) appProperties.setString('ApplicationName',getCookie('ApplicationName'));
	if (getCookie('Username')) appProperties.setString('Username',getCookie('Username'));
	if (getCookie('Password')) appProperties.setString('Password',getCookie('Password'));
	if (getCookie('Server')) appProperties.setString('Server',getCookie('Server'));
	if (getCookie('SavedCollections')) appProperties.setString('SavedCollections',getCookie('SavedCollections'));
	if (getCookie('splitter1')) appProperties.setString('splitter1',getCookie('splitter1'));
	if (getCookie('splitter2')) appProperties.setString('splitter2',getCookie('splitter2'));
	if (getCookie('splitter3')) appProperties.setString('splitter3',getCookie('splitter3'));
	if (getCookie('splitter4')) appProperties.setString('splitter4',getCookie('splitter4'));
//store app config to file
	appProperties.saveTo(appPropertiesFile.nativePath());
}); */

/*******************************/
/* Emulate webkitNotifications */
/*******************************/

//a empty callback for notifications
var callBack = function () {}

//create an object to emulate
window.webkitNotifications = new Object();

//the app always have permissons to display notifications
window.webkitNotifications.checkPermission = function () { return 0; }

//create a function to notificate
window.webkitNotifications.createNotification = function (pic, title, text) {
	return {
//on show call return TI Notification
		show : function () {
			var notification = Ti.Notification.createNotification({
				'title' : title,
				'message' : text,
				'timeout' : -1,
				'callback' : callBack,
				'icon' : pic
			});
			notification.show();
		},
//not necessary event listener
		addEventListener : function () { }
	}
}