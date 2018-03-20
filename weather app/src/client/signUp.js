module.exports = (error="")=>`<form method="post">
<div>Login </div>
<div>
	<input type="text" name="username">
</div>
<div>Password </div>
<div>
	<input id="p1" type="password" name="password">
</div>
<div>Confirm password </div>
<div>
	<input id="p2" type="password" name="password2">
</div>
	<div id="error"></div>
<div>
</div>
	<div>${error}</div>
<div>
	<input type="submit" value="Sign Up"/>
</div>
<div>
	<input type="button" onclick="location.href='/signIn'" value="Sign In"/>
</div>
</form>
`