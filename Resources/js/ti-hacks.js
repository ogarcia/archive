/*************************************/
/* Store and Load windows properties */
/*************************************/

var PropertiesFile = Ti.Filesystem.getFile(Ti.API.application.dataPath, "user.properties");
var MainWindow = Ti.UI.getMainWindow();
var userProperties;

//if file exists, then load properties.
if(PropertiesFile.exists()) {
    userProperties = Ti.App.loadProperties(PropertiesFile.nativePath());
    //read properties, if error then set default
    if(!userProperties.hasProperty('positionX'))
    	userProperties.setInt('positionX',MainWindow.getX());
    if(!userProperties.hasProperty('positionY'))
    	userProperties.setInt('positionY',MainWindow.getY());
    if(!userProperties.hasProperty('windowHeight'))
    	userProperties.setInt('windowHeight',MainWindow.getMinHeight());
    if(!userProperties.hasProperty('windowWidth'))
    	userProperties.setInt('windowWidth',MainWindow.getMinWidth());
    if(!userProperties.hasProperty('isMaximized'))
    	userProperties.setBool('isMaximized',true);
} else {
//create new set of properties if file doesn't exist
	userProperties = Ti.App.createProperties({
		positionX : MainWindow.getX(),
		positionY : MainWindow.getY(),
		windowHeight : MainWindow.getMinHeight(),
		windowWidth : MainWindow.getMinWidth(),
		isMaximized : true
	});
}

//modify window with stored properties
MainWindow.setX(userProperties.getInt('positionX'));
MainWindow.setY(userProperties.getInt('positionY'));
MainWindow.setHeight(userProperties.getInt('windowHeight'));
MainWindow.setWidth(userProperties.getInt('windowWidth'));
if(userProperties.getBool('isMaximized')) {
	MainWindow.maximize();
}

//store new properties when app close
Ti.API.addEventListener(Ti.APP_EXIT, function () {
	userProperties = Ti.App.createProperties({
		positionX : MainWindow.getX(),
		positionY : MainWindow.getY(),
		windowHeight : MainWindow.getHeight(),
		windowWidth : MainWindow.getWidth(),
		isMaximized : MainWindow.isMaximized()
	});
//store to file
	userProperties.saveTo(PropertiesFile.nativePath());
});