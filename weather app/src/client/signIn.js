module.exports = (error="")=>`<form method="post">
<div>Login </div>
<div>
	<input type="text" name="username">
</div>
<div>Password </div>
<div>
	<input type="password" name="password">
</div>
	<div>${error}</div>
<div>
	<input type="submit" value="Sign In">
</div>
<div>
	<input type="button" onclick="location.href='/signUp'" value="Sign Up"/>
</div>
</form>
`