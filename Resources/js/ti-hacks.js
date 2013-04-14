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

var appPropertiesFile = Ti.Filesystem.getFile(Ti.API.application.dataPath, "application.properties");
var appProperties = Ti.App.createProperties();

if(appPropertiesFile.exists()) {
//read settings from properties file and store in cookie
    appProperties = Ti.App.loadProperties(appPropertiesFile.nativePath());
    if(appProperties.hasProperty('UserName')) setCookie('username', appProperties.getString('UserName'));
    if(appProperties.hasProperty('PasswordEnc')) setCookie('passwordenc', appProperties.getString('PasswordEnc'));
    if(appProperties.hasProperty('AutoPlaylists')) setCookie('AutoPlaylists', appProperties.getString('AutoPlaylists'));
    if(appProperties.hasProperty('AutoAlbumSize')) setCookie('AutoAlbumSize', appProperties.getString('AutoAlbumSize'));
    if(appProperties.hasProperty('AutoPlaylistSize')) setCookie('AutoPlaylistSize', appProperties.getString('AutoPlaylistSize'));
    if(appProperties.hasProperty('Server')) setCookie('Server', appProperties.getString('Server'));
    if(appProperties.hasProperty('ApplicationName')) setCookie('ApplicationName', appProperties.getString('ApplicationName'));
    if(appProperties.hasProperty('Theme')) setCookie('Theme', appProperties.getString('Theme'));
    if(appProperties.hasProperty('HideAZ')) {
    	if (appProperties.getInt('HideAZ') == 1) {
    		setCookie('HideAZ', 1);
    	} else {
    		setCookie('HideAZ', null);
    	}
    }
    if(appProperties.hasProperty('Notification_Song')) {
    	if (appProperties.getInt('Notification_Song') == 1) {
    		setCookie('Notification_Song', 1);
    	} else {
    		setCookie('Notification_Song', null);
    	}
    } else {
    	//notificate by default :)
    	setCookie('Notification_Song', 1);
    }
    if(appProperties.hasProperty('Notification_NowPlaying')) { 
    	if (appProperties.getInt('Notification_NowPlaying') == 1) {
    		setCookie('Notification_NowPlaying', 1);
    	} else {
    		setCookie('Notification_NowPlaying', null);
    	}
    } else {
    	//notificate by default :)
    	setCookie('Notification_NowPlaying', 1);
    }
    if(appProperties.hasProperty('SaveTrackPosition')) { 
    	if (appProperties.getInt('SaveTrackPosition') == 1) {
    		setCookie('SaveTrackPosition', 1);
    		if(appProperties.hasProperty('CurrentSong'))
    			setCookie('CurrentSong', appProperties.getString('CurrentSong'));
    	} else {
    		//if not save track position no current song
    		setCookie('SaveTrackPosition', null);
    		setCookie('CurrentSong', null);
    	}
    } else {
    	//save position by default :)
    	setCookie('SaveTrackPosition', 1);
    }
    if(appProperties.hasProperty('ScrollTitle')) {
    	if (appProperties.getInt('ScrollTitle') == 1) {
    		setCookie('ScrollTitle', 1);
    	} else {
    		setCookie('ScrollTitle', null);
    	}
    }
    if(appProperties.hasProperty('Debug')) {
    	if (appProperties.getInt('Debug') == 1) {
    		setCookie('Debug', 1);
    	} else {
    		setCookie('Debug', null);
    	}
    }
    if(appProperties.hasProperty('ForceFlash')) {
    	if (appProperties.getInt('ForceFlash') == 1) {
    		setCookie('ForceFlash', 1);
    	} else {
    		setCookie('ForceFlash', null);
    	}
    }
    if(appProperties.hasProperty('Protocol')) {
    	if (appProperties.getInt('Protocol') == 1) {
    		setCookie('Protocol', 1);
    	} else {
    		setCookie('Protocol', null);
    	}
    }
    if(appProperties.hasProperty('AutoPilot')) setCookie('AutoPilot', appProperties.getString('AutoPilot'));
    if(appProperties.hasProperty('CurrentVersion')) setCookie('CurrentVersion', appProperties.getString('CurrentVersion'));
    if(appProperties.hasProperty('ApplicationName')) setCookie('ApplicationName', appProperties.getString('ApplicationName'));
}

Ti.API.addEventListener(Ti.APP_EXIT, function () {
//read settings from cookie and store it in properties file
	if (getCookie('username')) appProperties.setString('UserName',getCookie('username'));
	if (getCookie('passwordenc')) appProperties.setString('PasswordEnc',getCookie('passwordenc'));
	if (getCookie('AutoPlaylists')) appProperties.setString('AutoPlaylists',getCookie('AutoPlaylists'));
	if (getCookie('AutoAlbumSize')) appProperties.setString('AutoAlbumSize',getCookie('AutoAlbumSize'));
	if (getCookie('AutoPlaylistSize')) appProperties.setString('PasswordEnc',getCookie('passwordenc'));
	if (getCookie('Server')) appProperties.setString('Server',getCookie('Server'));
	if (getCookie('ApplicationName')) appProperties.setString('PasswordEnc',getCookie('passwordenc'));
	if (getCookie('Theme')) appProperties.setString('Theme',getCookie('Theme'));
	if (getCookie('HideAZ')) {
		appProperties.setInt('HideAZ',1);
	} else {
		appProperties.setInt('HideAZ',0);
	}
	if (getCookie('Notification_Song')) {
		appProperties.setInt('Notification_Song',1);
	} else {
		appProperties.setInt('Notification_Song',0);
	}
	if (getCookie('Notification_NowPlaying')) {
		appProperties.setInt('Notification_NowPlaying',1);
	} else {
		appProperties.setInt('Notification_NowPlaying',0);
	}
	if (getCookie('SaveTrackPosition')) {
		appProperties.setInt('SaveTrackPosition',1);
		if (getCookie('CurrentSong'))
			appProperties.setString('CurrentSong',getCookie('CurrentSong'));
	} else {
		//if not save track position delete current song
		appProperties.setInt('SaveTrackPosition',0);
		appProperties.removeProperty('CurrentSong');
	}
	if (getCookie('ScrollTitle')) {
		appProperties.setInt('ScrollTitle',1);
	} else {
		appProperties.setInt('ScrollTitle',0);
	}
	if (getCookie('Debug')) {
		appProperties.setInt('Debug',1);
	} else {
		appProperties.setInt('Debug',0);
	}
	if (getCookie('ForceFlash')) {
		appProperties.setInt('ForceFlash',1);
	} else {
		appProperties.setInt('ForceFlash',0);
	}
	if (getCookie('Protocol')) {
		appProperties.setInt('Protocol',1);
	} else {
		appProperties.setInt('Protocol',0);
	}
	if (getCookie('AutoPilot')) appProperties.setString('AutoPilot',getCookie('AutoPilot'));
	if (getCookie('CurrentVersion')) appProperties.setString('CurrentVersion',getCookie('CurrentVersion'));
	if (getCookie('ApplicationName')) appProperties.setString('ApplicationName',getCookie('ApplicationName'));
//store app config to file
	appProperties.saveTo(appPropertiesFile.nativePath());
});

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
