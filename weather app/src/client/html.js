module.exports = (app)=> `<!DOCTYPE html>
<html lang="en-US">
<html>
	<head>
		<title>Weather app</title>
		<meta name="author" content="Artur Ziemba">
		<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
		<link rel="stylesheet" href="styles.css">
	</head>
	<body>
		<div class='app'>${app}</div>
	</body>
</html>
`