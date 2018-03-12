const {app, dialog, BrowserWindow} = require('electron');
//const home = require('os').homedir();
const path = require('path')

app.on('ready', function() {
	let dir = dialog.showOpenDialog({properties: ['openDirectory']});
	if (process.send) {
		process.send(dir);
	}
	app.quit();
})