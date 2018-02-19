const {app, BrowserWindow} = require('electron')
  const path = require('path')
  const url = require('url')
  
  let window = null

// Wait until the app is ready
app.once('ready', () => {
  // Create a new window
  window = new BrowserWindow({
    // Set the initial width to 400px
    width: 400,
    // Set the initial height to 500px
    height: 500,
    // Don't show the window until it ready, this prevents any white flickering
    show: false,
  })

  // Load a URL in the window to the local index.html path
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'angular', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Show window when page is ready
  window.once('ready-to-show', () => {
	 window.setMenu(null) ;
	 window.maximize();
    window.show()
  })
})